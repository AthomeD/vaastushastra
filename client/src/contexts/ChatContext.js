import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  socket: null,
  chats: [],
  currentChat: null,
  messages: [],
  onlineUsers: [],
  typingUsers: {},
  loading: false,
  error: null
};

// Action types
const CHAT_ACTIONS = {
  SET_SOCKET: 'SET_SOCKET',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CHATS: 'SET_CHATS',
  SET_CURRENT_CHAT: 'SET_CURRENT_CHAT',
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  SET_ONLINE_USERS: 'SET_ONLINE_USERS',
  SET_TYPING_USERS: 'SET_TYPING_USERS',
  ADD_TYPING_USER: 'ADD_TYPING_USER',
  REMOVE_TYPING_USER: 'REMOVE_TYPING_USER',
  MARK_MESSAGES_READ: 'MARK_MESSAGES_READ',
  UPDATE_CHAT_LAST_MESSAGE: 'UPDATE_CHAT_LAST_MESSAGE',
  ADD_CHAT: 'ADD_CHAT',
  UPDATE_CHAT: 'UPDATE_CHAT'
};

// Reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_ACTIONS.SET_SOCKET:
      return { ...state, socket: action.payload };
    
    case CHAT_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case CHAT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case CHAT_ACTIONS.SET_CHATS:
      return { ...state, chats: action.payload };
    
    case CHAT_ACTIONS.SET_CURRENT_CHAT:
      return { ...state, currentChat: action.payload };
    
    case CHAT_ACTIONS.SET_MESSAGES:
      return { ...state, messages: action.payload };
    
    case CHAT_ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        chats: state.chats.map(chat => 
          chat._id === action.payload.chatId 
            ? { ...chat, lastMessage: action.payload.timestamp }
            : chat
        )
      };
    
    case CHAT_ACTIONS.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(msg => 
          msg._id === action.payload._id ? action.payload : msg
        )
      };
    
    case CHAT_ACTIONS.SET_ONLINE_USERS:
      return { ...state, onlineUsers: action.payload };
    
    case CHAT_ACTIONS.SET_TYPING_USERS:
      return { ...state, typingUsers: action.payload };
    
    case CHAT_ACTIONS.ADD_TYPING_USER:
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.chatId]: [
            ...(state.typingUsers[action.payload.chatId] || []),
            action.payload.userId
          ]
        }
      };
    
    case CHAT_ACTIONS.REMOVE_TYPING_USER:
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.chatId]: (state.typingUsers[action.payload.chatId] || [])
            .filter(id => id !== action.payload.userId)
        }
      };
    
    case CHAT_ACTIONS.MARK_MESSAGES_READ:
      return {
        ...state,
        messages: state.messages.map(msg => 
          msg.chatId === action.payload.chatId && !msg.isRead
            ? { ...msg, isRead: true }
            : msg
        )
      };
    
    case CHAT_ACTIONS.UPDATE_CHAT_LAST_MESSAGE:
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat._id === action.payload.chatId
            ? { ...chat, lastMessage: action.payload.timestamp }
            : chat
        )
      };
    
    case CHAT_ACTIONS.ADD_CHAT:
      return {
        ...state,
        chats: [action.payload, ...state.chats]
      };
    
    case CHAT_ACTIONS.UPDATE_CHAT:
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat._id === action.payload._id ? action.payload : chat
        )
      };
    
    default:
      return state;
  }
};

// Create context
const ChatContext = createContext();

// Custom hook to use chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Provider component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef({});

  // Initialize socket connection
  const initializeSocket = (token) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to chat server');
      dispatch({ type: CHAT_ACTIONS.SET_SOCKET, payload: socket });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      dispatch({ type: CHAT_ACTIONS.SET_SOCKET, payload: null });
    });

    socket.on('new-message', (message) => {
      dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: message });
      
      // Show notification if not in current chat
      if (state.currentChat?._id !== message.chatId) {
        toast.success(`New message from ${message.sender.name}`, {
          duration: 3000,
          position: 'top-right'
        });
      }
    });

    socket.on('typing-start', ({ chatId, userId, userName }) => {
      dispatch({ 
        type: CHAT_ACTIONS.ADD_TYPING_USER, 
        payload: { chatId, userId } 
      });
    });

    socket.on('typing-stop', ({ chatId, userId }) => {
      dispatch({ 
        type: CHAT_ACTIONS.REMOVE_TYPING_USER, 
        payload: { chatId, userId } 
      });
    });

    socket.on('messages-read', ({ chatId, userId }) => {
      dispatch({ 
        type: CHAT_ACTIONS.MARK_MESSAGES_READ, 
        payload: { chatId, userId } 
      });
    });

    socket.on('user-online', (userId) => {
      dispatch({ 
        type: CHAT_ACTIONS.SET_ONLINE_USERS, 
        payload: [...state.onlineUsers, userId] 
      });
    });

    socket.on('user-offline', (userId) => {
      dispatch({ 
        type: CHAT_ACTIONS.SET_ONLINE_USERS, 
        payload: state.onlineUsers.filter(id => id !== userId) 
      });
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error('Connection error. Please refresh the page.');
    });

    return socket;
  };

  // Load all chats for current user
  const loadChats = async () => {
    try {
      dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: true });
      const response = await axios.get('/api/chat');
      dispatch({ type: CHAT_ACTIONS.SET_CHATS, payload: response.data });
    } catch (error) {
      console.error('Error loading chats:', error);
      dispatch({ type: CHAT_ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to load chats');
    } finally {
      dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Load specific chat and its messages
  const loadChat = async (chatId) => {
    try {
      dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: true });
      const response = await axios.get(`/api/chat/${chatId}`);
      dispatch({ type: CHAT_ACTIONS.SET_CURRENT_CHAT, payload: response.data });
      dispatch({ type: CHAT_ACTIONS.SET_MESSAGES, payload: response.data.messages });
      
      // Join chat room
      if (socketRef.current) {
        socketRef.current.emit('join-chat', { chatId });
      }
      
      // Mark messages as read
      await markAsRead(chatId);
    } catch (error) {
      console.error('Error loading chat:', error);
      dispatch({ type: CHAT_ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to load chat');
    } finally {
      dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Create new chat
  const createChat = async (participantIds, chatType = 'direct', title = null) => {
    try {
      const response = await axios.post('/api/chat', {
        participants: participantIds,
        chatType,
        title
      });
      
      dispatch({ type: CHAT_ACTIONS.ADD_CHAT, payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat');
      throw error;
    }
  };

  // Send message
  const sendMessage = async (chatId, content, type = 'text', attachments = []) => {
    try {
      const response = await axios.post(`/api/chat/${chatId}/messages`, {
        content,
        type,
        attachments
      });
      
      const message = response.data;
      dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: message });
      
      // Emit socket event
      if (socketRef.current) {
        socketRef.current.emit('send-message', {
          chatId,
          message: message
        });
      }
      
      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      throw error;
    }
  };

  // Mark messages as read
  const markAsRead = async (chatId) => {
    try {
      await axios.put(`/api/chat/${chatId}/read`);
      dispatch({ type: CHAT_ACTIONS.MARK_MESSAGES_READ, payload: { chatId } });
      
      // Emit socket event
      if (socketRef.current) {
        socketRef.current.emit('mark-read', { chatId });
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Start typing indicator
  const startTyping = (chatId) => {
    if (socketRef.current) {
      socketRef.current.emit('typing-start', { chatId });
      
      // Clear existing timeout
      if (typingTimeoutRef.current[chatId]) {
        clearTimeout(typingTimeoutRef.current[chatId]);
      }
    }
  };

  // Stop typing indicator
  const stopTyping = (chatId) => {
    if (socketRef.current) {
      socketRef.current.emit('typing-stop', { chatId });
      
      // Clear timeout
      if (typingTimeoutRef.current[chatId]) {
        clearTimeout(typingTimeoutRef.current[chatId]);
        delete typingTimeoutRef.current[chatId];
      }
    }
  };

  // Get list of consultants
  const getConsultants = async () => {
    try {
      const response = await axios.get('/api/chat/consultants/list');
      return response.data;
    } catch (error) {
      console.error('Error getting consultants:', error);
      toast.error('Failed to load consultants');
      return [];
    }
  };

  // Leave chat
  const leaveChat = (chatId) => {
    if (socketRef.current) {
      socketRef.current.emit('leave-chat', { chatId });
    }
    
    if (state.currentChat?._id === chatId) {
      dispatch({ type: CHAT_ACTIONS.SET_CURRENT_CHAT, payload: null });
      dispatch({ type: CHAT_ACTIONS.SET_MESSAGES, payload: [] });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      
      // Clear all typing timeouts
      Object.values(typingTimeoutRef.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const value = {
    ...state,
    initializeSocket,
    loadChats,
    loadChat,
    createChat,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
    getConsultants,
    leaveChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
