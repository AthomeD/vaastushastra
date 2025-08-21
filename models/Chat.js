const mongoose = require('mongoose');

// Message sub-schema
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'location'],
    default: 'text'
  },
  attachments: [{
    type: String,
    url: String,
    filename: String,
    size: Number
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

// Main Chat schema
const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema],
  chatType: {
    type: String,
    enum: ['direct', 'group', 'consultation'],
    default: 'direct'
  },
  title: {
    type: String,
    trim: true
  },
  lastMessage: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  vaastuContext: {
    propertyType: {
      type: String,
      enum: ['residential', 'commercial', 'industrial', 'temple', 'other']
    },
    propertyDetails: {
      address: String,
      dimensions: {
        length: Number,
        width: Number
      },
      facing: {
        type: String,
        enum: ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest']
      },
      constructionStage: {
        type: String,
        enum: ['planning', 'under-construction', 'completed', 'renovation']
      }
    },
    issues: [String],
    remedies: [String]
  }
}, {
  timestamps: true
});

// Index for efficient querying
chatSchema.index({ participants: 1, lastMessage: -1 });
chatSchema.index({ 'messages.sender': 1 });
chatSchema.index({ chatType: 1 });

// Pre-save hook to update lastMessage
chatSchema.pre('save', function(next) {
  if (this.messages.length > 0) {
    this.lastMessage = this.messages[this.messages.length - 1].timestamp;
  }
  next();
});

// Virtual for unread message count
chatSchema.virtual('unreadCount').get(function() {
  return this.messages.filter(msg => !msg.isRead).length;
});

// Method to add message
chatSchema.methods.addMessage = function(senderId, content, type = 'text', attachments = []) {
  const message = {
    sender: senderId,
    content,
    type,
    attachments,
    timestamp: new Date(),
    isRead: false
  };
  
  this.messages.push(message);
  this.lastMessage = message.timestamp;
  return this.save();
};

// Method to mark messages as read
chatSchema.methods.markAsRead = function(userId) {
  this.messages.forEach(msg => {
    if (msg.sender.toString() !== userId.toString() && !msg.isRead) {
      msg.isRead = true;
    }
  });
  return this.save();
};

// Static method to find or create chat
chatSchema.statics.findOrCreateChat = async function(participantIds, chatType = 'direct', title = null) {
  if (chatType === 'direct' && participantIds.length === 2) {
    // For direct chats, check if chat already exists
    const existingChat = await this.findOne({
      participants: { $all: participantIds },
      chatType: 'direct'
    });
    
    if (existingChat) {
      return existingChat;
    }
  }
  
  // Create new chat
  const chat = new this({
    participants: participantIds,
    chatType,
    title
  });
  
  return chat.save();
};

module.exports = mongoose.model('Chat', chatSchema);
