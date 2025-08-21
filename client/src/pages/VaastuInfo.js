import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const VaastuInfo = () => {
  return (
    <>
      <Helmet>
        <title>Vaastu Information - Vaastu Shaastra</title>
        <meta name="description" content="Comprehensive Vaastu Shastra information and principles" />
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
              Vaastu Information
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the comprehensive knowledge of Vaastu Shastra principles, elements, and applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you comprehensive Vaastu information including:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Detailed explanations of the Five Elements (Pancha Bhootas)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Eight Directions and their significance
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Vastu Purusha Mandala and cosmic energy grid
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Room-wise Vaastu guidelines
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Practical remedies and solutions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Interactive diagrams and animations
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-lg text-gray-600 mb-8">
              In the meantime, explore our interactive Vaastu diagram on the homepage or connect with our experts through the chat system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="btn-primary">
                Explore Homepage
              </a>
              <a href="/chat" className="btn-secondary">
                Chat with Experts
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default VaastuInfo;
