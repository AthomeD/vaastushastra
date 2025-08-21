import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Remedies = () => {
  return (
    <>
      <Helmet>
        <title>Vaastu Remedies - Vaastu Shaastra</title>
        <meta name="description" content="Vaastu remedies and solutions for common problems" />
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
              Vaastu Remedies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical solutions and remedies to balance energy and create harmonious living spaces
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Comprehensive Remedies Database</h2>
            <p className="text-gray-600 mb-6">
              Our remedies section will provide detailed solutions for various Vaastu issues:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Common Problems</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Financial difficulties</li>
                  <li>• Health issues</li>
                  <li>• Relationship problems</li>
                  <li>• Career obstacles</li>
                  <li>• Sleep disturbances</li>
                  <li>• Energy blockages</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Solution Types</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Crystal and gemstone remedies</li>
                  <li>• Color therapy solutions</li>
                  <li>• Element balancing techniques</li>
                  <li>• Sacred geometry applications</li>
                  <li>• Mantra and meditation practices</li>
                  <li>• Structural modifications</li>
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
              Get personalized remedies by consulting with our Vaastu experts through the chat system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/chat" className="btn-primary">
                Chat with Experts
              </a>
              <a href="/consultation" className="btn-secondary">
                Book Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Remedies;
