import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Phone, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Helmet>
        <title>Profile - Vaastu Shaastra</title>
        <meta name="description" content="Manage your Vaastu Shaastra profile" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              My Profile
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your account settings and preferences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
                    <p className="text-orange-100">{user?.email}</p>
                    <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm mt-2">
                      {user?.role || 'User'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Profile Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Profile Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{user?.name || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{user?.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{user?.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    {user?.interests && user.interests.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Areas of Interest</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-400" />
                        <span>Edit Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                        <User className="w-5 h-5 text-gray-400" />
                        <span>View Consultations</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>Chat History</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
