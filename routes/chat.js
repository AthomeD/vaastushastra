const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const User = require('../models/User');

// Middleware to verify token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all chats for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
      isActive: true
    })
    .populate('participants', 'name email profilePicture role')
    .populate('messages.sender', 'name profilePicture')
    .sort({ lastMessage: -1 });

    res.json({
      success: true,
      chats
    });
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific chat
router.get('/:chatId', authenticateToken, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      participants: req.user._id
    })
    .populate('participants', 'name email profilePicture role')
    .populate('messages.sender', 'name profilePicture');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({
      success: true,
      chat
    });
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new chat
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { participants, chatType, title, vaastuContext } = req.body;

    // Ensure current user is in participants
    const allParticipants = [...new Set([...participants, req.user._id.toString()])];

    // Check if chat already exists
    const existingChat = await Chat.findOne({
      participants: { $all: allParticipants },
      chatType: chatType || 'private',
      isActive: true
    });

    if (existingChat) {
      return res.json({
        success: true,
        chat: existingChat
      });
    }

    // Create new chat
    const chat = await Chat.create({
      participants: allParticipants,
      chatType: chatType || 'private',
      title: title || '',
      vaastuContext: vaastuContext || {}
    });

    const populatedChat = await Chat.findById(chat._id)
      .populate('participants', 'name email profilePicture role');

    res.status(201).json({
      success: true,
      chat: populatedChat
    });
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/:chatId/messages', authenticateToken, async (req, res) => {
  try {
    const { content, messageType, attachments } = req.body;

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      participants: req.user._id,
      isActive: true
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = {
      sender: req.user._id,
      content,
      messageType: messageType || 'text',
      attachments: attachments || [],
      timestamp: new Date()
    };

    chat.messages.push(message);
    chat.lastMessage = new Date();
    await chat.save();

    const populatedChat = await Chat.findById(chat._id)
      .populate('participants', 'name email profilePicture role')
      .populate('messages.sender', 'name profilePicture');

    res.json({
      success: true,
      message: populatedChat.messages[populatedChat.messages.length - 1]
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark messages as read
router.put('/:chatId/read', authenticateToken, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      participants: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Mark all messages as read for this user
    chat.messages.forEach(message => {
      if (message.sender.toString() !== req.user._id.toString()) {
        message.isRead = true;
      }
    });

    await chat.save();

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get consultants for chat
router.get('/consultants/list', authenticateToken, async (req, res) => {
  try {
    const consultants = await User.find({
      role: 'consultant',
      isVerified: true
    }).select('name email profilePicture');

    res.json({
      success: true,
      consultants
    });
  } catch (error) {
    console.error('Get consultants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
