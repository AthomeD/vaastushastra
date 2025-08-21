import React from 'react';
import { motion } from 'framer-motion';

const ElementCard = ({ element, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="card p-6 group cursor-pointer"
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${element.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
        {element.icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-center">{element.name}</h3>
      <p className="text-gray-600 text-center mb-4">{element.description}</p>
      
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Properties:</h4>
        <div className="flex flex-wrap gap-2">
          {element.properties.map((property, propIndex) => (
            <span
              key={propIndex}
              className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-xs font-medium"
            >
              {property}
            </span>
          ))}
        </div>
      </div>
      
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className={`w-full h-1 bg-gradient-to-r ${element.color} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </motion.div>
  );
};

export default ElementCard;
