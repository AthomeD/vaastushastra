import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const DirectionCard = ({ direction, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="card p-6 group cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-20 h-20 bg-gradient-to-r ${direction.color} rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Compass className="w-8 h-8" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{direction.name}</h3>
          <p className="text-gray-600 mb-3">{direction.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Deity:</span>
              <p className="text-gray-600">{direction.deity}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Element:</span>
              <p className="text-gray-600">{direction.element}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Best For:</h4>
            <div className="flex flex-wrap gap-2">
              {direction.bestFor.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className={`w-full h-1 bg-gradient-to-r ${direction.color} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </motion.div>
  );
};

export default DirectionCard;
