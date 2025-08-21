import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Consultation = () => {
  return (
    <>
      <Helmet>
        <title>Consultation Services - Vaastu Shaastra</title>
        <meta name="description" content="Book consultations with certified Vaastu experts" />
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
              Consultation Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized Vaastu guidance from certified experts and consultants
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Expert Consultation Services</h2>
            <p className="text-gray-600 mb-6">
              Our consultation platform will offer comprehensive Vaastu services:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Consultation Types</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Residential property analysis</li>
                  <li>• Commercial space planning</li>
                  <li>• Construction site evaluation</li>
                  <li>• Renovation guidance</li>
                  <li>• Interior design consultation</li>
                  <li>• Problem-specific remedies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Expert Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Certified Vaastu consultants</li>
                  <li>• Real-time chat consultation</li>
                  <li>• Video call sessions</li>
                  <li>• Detailed property reports</li>
                  <li>• Follow-up support</li>
                  <li>• Custom remedy packages</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-lg text-gray-600 mb-8">
              Start your Vaastu journey by connecting with our experts through the chat system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/chat" className="btn-primary">
                Start Chat Consultation
              </a>
              <a href="/register" className="btn-secondary">
                Create Account
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Consultation;
