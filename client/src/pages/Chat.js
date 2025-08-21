import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Send, Users } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const { chats, currentChat, messages, loading, sendMessage, loadChats, loadChat } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    try {
      await sendMessage(selectedChat, message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChatSelect = async (chatId) => {
    setSelectedChat(chatId);
    await loadChat(chatId);
  };

  return (
    <>
      <Helmet>
        <title>Chat - Vaastu Shaastra</title>
        <meta name="description" content="Chat with Vaastu experts and consultants" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Chat with Experts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with certified Vaastu consultants for personalized guidance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex h-96">
              {/* Chat List */}
              <div className="w-1/3 border-r border-gray-200 bg-gray-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Conversations
                  </h3>
                </div>
                <div className="overflow-y-auto h-full">
                  {loading ? (
                    <div className="p-4 text-center">
                      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                  ) : chats.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No conversations yet</p>
                      <p className="text-sm">Start a chat with our experts</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {chats.map((chat) => (
                        <button
                          key={chat._id}
                          onClick={() => handleChatSelect(chat._id)}
                          className={`w-full p-4 text-left hover:bg-gray-100 transition-colors ${
                            selectedChat === chat._id ? 'bg-orange-100 border-r-2 border-orange-500' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {chat.title || 'Chat with Expert'}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {chat.messages && chat.messages.length > 0
                                  ? chat.messages[chat.messages.length - 1].content.substring(0, 30) + '...'
                                  : 'No messages yet'}
                              </p>
                            </div>
                            {chat.unreadCount > 0 && (
                              <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <h3 className="font-semibold text-gray-800">
                        {currentChat?.title || 'Chat with Expert'}
                      </h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                          <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No messages yet</p>
                          <p className="text-sm">Start the conversation</p>
                        </div>
                      ) : (
                        messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.sender === user?.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                msg.sender === user?.id
                                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p>{msg.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 input-field"
                        />
                        <button
                          type="submit"
                          disabled={!message.trim()}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                      <p>Choose a chat from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Chat;
