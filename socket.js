const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Chat = require('./models/Chat');

module.exports = (io) => {
  // Store connected users
  const connectedUsers = new Map();

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id;
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.userId})`);
    
    // Add user to connected users
    connectedUsers.set(socket.userId.toString(), {
      socketId: socket.id,
      user: socket.user
    });

    // Join user to their personal room
    socket.join(socket.userId.toString());

    // Handle joining chat rooms
    socket.on('join-chat', (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.user.name} joined chat: ${chatId}`);
    });

    // Handle leaving chat rooms
    socket.on('leave-chat', (chatId) => {
      socket.leave(chatId);
      console.log(`User ${socket.user.name} left chat: ${chatId}`);
    });

    // Handle sending messages
    socket.on('send-message', async (data) => {
      try {
        const { chatId, content, messageType, attachments } = data;

        // Verify user is part of the chat
        const chat = await Chat.findOne({
          _id: chatId,
          participants: socket.userId,
          isActive: true
        });

        if (!chat) {
          socket.emit('error', { message: 'Chat not found or access denied' });
          return;
        }

        // Create message
        const message = {
          sender: socket.userId,
          content,
          messageType: messageType || 'text',
          attachments: attachments || [],
          timestamp: new Date()
        };

        // Add message to chat
        chat.messages.push(message);
        chat.lastMessage = new Date();
        await chat.save();

        // Populate sender info
        const populatedMessage = {
          ...message.toObject(),
          sender: {
            _id: socket.user._id,
            name: socket.user.name,
            profilePicture: socket.user.profilePicture
          }
        };

        // Emit message to all participants in the chat
        io.to(chatId).emit('new-message', {
          chatId,
          message: populatedMessage
        });

        // Emit typing stopped
        socket.to(chatId).emit('typing-stopped', {
          chatId,
          userId: socket.userId,
          userName: socket.user.name
        });

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing-start', (data) => {
      const { chatId } = data;
      socket.to(chatId).emit('typing-start', {
        chatId,
        userId: socket.userId,
        userName: socket.user.name
      });
    });

    socket.on('typing-stop', (data) => {
      const { chatId } = data;
      socket.to(chatId).emit('typing-stopped', {
        chatId,
        userId: socket.userId,
        userName: socket.user.name
      });
    });

    // Handle read receipts
    socket.on('mark-read', async (data) => {
      try {
        const { chatId } = data;

        const chat = await Chat.findOne({
          _id: chatId,
          participants: socket.userId
        });

        if (!chat) {
          return;
        }

        // Mark messages as read
        let updated = false;
        chat.messages.forEach(message => {
          if (message.sender.toString() !== socket.userId.toString() && !message.isRead) {
            message.isRead = true;
            updated = true;
          }
        });

        if (updated) {
          await chat.save();
          
          // Notify other participants
          socket.to(chatId).emit('messages-read', {
            chatId,
            userId: socket.userId,
            userName: socket.user.name
          });
        }

      } catch (error) {
        console.error('Mark read error:', error);
      }
    });

    // Handle online status
    socket.on('set-online-status', (status) => {
      const userData = connectedUsers.get(socket.userId.toString());
      if (userData) {
        userData.onlineStatus = status;
        connectedUsers.set(socket.userId.toString(), userData);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name} (${socket.userId})`);
      connectedUsers.delete(socket.userId.toString());
    });
  });

  // Helper function to get online users
  const getOnlineUsers = () => {
    return Array.from(connectedUsers.values());
  };

  // Helper function to check if user is online
  const isUserOnline = (userId) => {
    return connectedUsers.has(userId.toString());
  };

  // Helper function to get user's socket ID
  const getUserSocketId = (userId) => {
    const userData = connectedUsers.get(userId.toString());
    return userData ? userData.socketId : null;
  };

  // Export helper functions
  io.getOnlineUsers = getOnlineUsers;
  io.isUserOnline = isUserOnline;
  io.getUserSocketId = getUserSocketId;
};
