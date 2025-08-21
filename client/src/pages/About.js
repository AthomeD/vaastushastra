import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Vaastu Shaastra</title>
        <meta name="description" content="Learn about Vaastu Shaastra and our mission" />
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
              About Vaastu Shaastra
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the ancient wisdom of Vedic architecture and create harmonious living spaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Ancient Wisdom for Modern Living
              </h2>
              <p className="text-gray-600 mb-6">
                Vaastu Shastra is an ancient Indian science of architecture and design that aims to create 
                harmonious living spaces by aligning them with natural forces and cosmic energy. Our platform 
                brings this timeless wisdom to the modern world, making it accessible to everyone.
              </p>
              <p className="text-gray-600">
                Whether you're building a new home, renovating an existing space, or simply want to 
                understand the principles of harmonious living, Vaastu Shaastra provides comprehensive 
                guidance and expert consultation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Preserve and promote ancient Vaastu wisdom
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Provide accessible Vaastu education and resources
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Connect users with certified Vaastu consultants
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Create harmonious living spaces worldwide
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Why Choose Vaastu Shaastra?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Comprehensive Knowledge</h3>
                <p className="text-gray-600">
                  Access detailed information about all aspects of Vaastu Shastra
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Consultation</h3>
                <p className="text-gray-600">
                  Connect with certified Vaastu consultants for personalized guidance
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Tools</h3>
                <p className="text-gray-600">
                  Use interactive diagrams and tools to understand Vaastu principles
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
