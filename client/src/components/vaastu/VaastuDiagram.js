import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Info, X } from 'lucide-react';

const VaastuDiagram = () => {
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const directions = [
    {
      id: 'north',
      name: 'North (Uttar)',
      deity: 'Kubera',
      element: 'Water',
      color: 'from-blue-500 to-cyan-500',
      position: 'top-0 left-1/2 transform -translate-x-1/2',
      description: 'Wealth and prosperity direction. Best for treasury, safe, water sources, and study room.',
      properties: ['Wealth', 'Prosperity', 'Career growth', 'Water elements']
    },
    {
      id: 'south',
      name: 'South (Dakshin)',
      deity: 'Yama',
      element: 'Fire',
      color: 'from-red-500 to-orange-500',
      position: 'bottom-0 left-1/2 transform -translate-x-1/2',
      description: 'Strength and stability direction. Best for kitchen, dining room, staircase, and heavy equipment.',
      properties: ['Strength', 'Stability', 'Authority', 'Fire elements']
    },
    {
      id: 'east',
      name: 'East (Purva)',
      deity: 'Indra',
      element: 'Air',
      color: 'from-green-500 to-teal-500',
      position: 'left-0 top-1/2 transform -translate-y-1/2',
      description: 'Health and family direction. Best for main entrance, prayer room, living room, and bathroom.',
      properties: ['Health', 'Family', 'New beginnings', 'Air elements']
    },
    {
      id: 'west',
      name: 'West (Paschim)',
      deity: 'Varuna',
      element: 'Water',
      color: 'from-blue-500 to-purple-500',
      position: 'right-0 top-1/2 transform -translate-y-1/2',
      description: 'Creativity and children direction. Best for children\'s room, study room, creative space, and bedroom.',
      properties: ['Creativity', 'Children', 'Learning', 'Water elements']
    },
    {
      id: 'northeast',
      name: 'Northeast (Ishanya)',
      deity: 'Ishana',
      element: 'Water',
      color: 'from-blue-500 to-indigo-500',
      position: 'top-0 left-0',
      description: 'Spiritual and knowledge direction. Best for prayer room, meditation space, and study area.',
      properties: ['Spirituality', 'Knowledge', 'Wisdom', 'Divine energy']
    },
    {
      id: 'northwest',
      name: 'Northwest (Vayavya)',
      deity: 'Vayu',
      element: 'Air',
      color: 'from-gray-500 to-blue-500',
      position: 'top-0 right-0',
      description: 'Movement and travel direction. Best for guest room, storage, and mechanical equipment.',
      properties: ['Movement', 'Travel', 'Communication', 'Air flow']
    },
    {
      id: 'southeast',
      name: 'Southeast (Agneya)',
      deity: 'Agni',
      element: 'Fire',
      color: 'from-orange-500 to-red-500',
      position: 'bottom-0 left-0',
      description: 'Energy and transformation direction. Best for kitchen, dining room, and fire-related activities.',
      properties: ['Energy', 'Transformation', 'Cooking', 'Fire activities']
    },
    {
      id: 'southwest',
      name: 'Southwest (Nairutya)',
      deity: 'Nirriti',
      element: 'Earth',
      color: 'from-yellow-500 to-orange-500',
      position: 'bottom-0 right-0',
      description: 'Stability and foundation direction. Best for master bedroom, heavy furniture, and foundation.',
      properties: ['Stability', 'Foundation', 'Rest', 'Earth elements']
    }
  ];

  const elements = [
    {
      id: 'earth',
      symbol: '🌍',
      name: 'Earth (Prithvi)',
      position: 'absolute w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg',
      centerPosition: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'water',
      symbol: '💧',
      name: 'Water (Jal)',
      position: 'absolute w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl shadow-lg',
      centerPosition: 'absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'fire',
      symbol: '🔥',
      name: 'Fire (Agni)',
      position: 'absolute w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xl shadow-lg',
      centerPosition: 'absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'air',
      symbol: '💨',
      name: 'Air (Vayu)',
      position: 'absolute w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-xl shadow-lg',
      centerPosition: 'absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2'
    },
    {
      id: 'space',
      symbol: '✨',
      name: 'Space (Akash)',
      position: 'absolute w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg',
      centerPosition: 'absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2'
    }
  ];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Diagram Container */}
      <div className="relative w-full h-96 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-4 border-orange-200 shadow-2xl overflow-hidden">
        
        {/* Central Compass */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{ rotate: isAnimating ? 360 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-24 h-24 bg-white rounded-full border-4 border-orange-300 flex items-center justify-center shadow-xl"
          >
            <Compass className="w-12 h-12 text-orange-500" />
          </motion.div>
        </div>

        {/* Direction Markers */}
        {directions.map((direction, index) => (
          <motion.button
            key={direction.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDirection(direction)}
            className={`absolute ${direction.position} w-16 h-16 bg-gradient-to-r ${direction.color} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-300 z-10`}
          >
            <div className="text-center">
              <div className="font-bold">{direction.name.split(' ')[0]}</div>
              <div className="text-xs opacity-90">{direction.deity}</div>
            </div>
          </motion.button>
        ))}

        {/* Element Symbols */}
        {elements.map((element, index) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
            className={`${element.position} ${element.centerPosition} z-5`}
            title={element.name}
          >
            <span className="text-2xl">{element.symbol}</span>
          </motion.div>
        ))}

        {/* Energy Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Diagonal lines */}
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            x1="0" y1="0" x2="100%" y2="100%"
            stroke="url(#energyFlow)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
            x1="100%" y1="0" x2="0" y2="100%"
            stroke="url(#energyFlow)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Cross lines */}
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            x1="50%" y1="0" x2="50%" y2="100%"
            stroke="url(#energyFlow)"
            strokeWidth="2"
            strokeDasharray="3,3"
          />
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="url(#energyFlow)"
            strokeWidth="2"
            strokeDasharray="3,3"
          />
        </svg>

        {/* Center Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg z-30"
        />
      </div>

      {/* Direction Details Modal */}
      <AnimatePresence>
        {selectedDirection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDirection(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedDirection.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {selectedDirection.name.split(' ')[0]}
                </div>
                <button
                  onClick={() => setSelectedDirection(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{selectedDirection.name}</h3>
              <p className="text-gray-600 mb-4">{selectedDirection.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Properties:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDirection.properties.map((prop, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p><strong>Deity:</strong> {selectedDirection.deity}</p>
                <p><strong>Element:</strong> {selectedDirection.element}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium">Water Elements</p>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium">Fire Elements</p>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium">Air Elements</p>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium">Earth Elements</p>
        </div>
      </div>
    </div>
  );
};

export default VaastuDiagram;
