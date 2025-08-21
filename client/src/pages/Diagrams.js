import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Diagrams = () => {
  return (
    <>
      <Helmet>
        <title>Vaastu Diagrams - Vaastu Shaastra</title>
        <meta name="description" content="Interactive Vaastu diagrams and visual guides" />
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
              Vaastu Diagrams
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive visual guides to understand Vaastu principles and cosmic energy flow
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Interactive Diagrams Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're developing comprehensive interactive diagrams that will include:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Vastu Purusha Mandala</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cosmic energy grid visualization</li>
                  <li>• Clickable direction markers</li>
                  <li>• Element associations</li>
                  <li>• Deity placements</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Room Layout Diagrams</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Optimal room placements</li>
                  <li>• Furniture positioning</li>
                  <li>• Energy flow patterns</li>
                  <li>• Remedy suggestions</li>
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
              Experience our interactive Vaastu diagram on the homepage while we work on expanding our diagram collection.
            </p>
            <a href="/" className="btn-primary">
              View Homepage Diagram
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Diagrams;
