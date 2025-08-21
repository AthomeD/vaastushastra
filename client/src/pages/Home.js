import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Home as HomeIcon, 
  Compass, 
  Sun, 
  Moon, 
  Wind, 
  Droplets, 
  Flame,
  Users,
  BookOpen,
  MessageCircle,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';
import VaastuDiagram from '../components/vaastu/VaastuDiagram';
import ElementCard from '../components/vaastu/ElementCard';
import DirectionCard from '../components/vaastu/DirectionCard';

const Home = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const elements = [
    {
      name: 'Earth (Prithvi)',
      icon: <HomeIcon className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Represents stability, patience, and material wealth',
      properties: ['Stability', 'Patience', 'Material wealth', 'Grounding']
    },
    {
      name: 'Water (Jal)',
      icon: <Droplets className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Symbolizes purity, wisdom, and emotional balance',
      properties: ['Purity', 'Wisdom', 'Emotional balance', 'Flow']
    },
    {
      name: 'Fire (Agni)',
      icon: <Flame className="w-8 h-8" />,
      color: 'from-red-500 to-orange-500',
      description: 'Represents energy, passion, and transformation',
      properties: ['Energy', 'Passion', 'Transformation', 'Power']
    },
    {
      name: 'Air (Vayu)',
      icon: <Wind className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      description: 'Symbolizes movement, communication, and freedom',
      properties: ['Movement', 'Communication', 'Freedom', 'Change']
    },
    {
      name: 'Space (Akash)',
      icon: <Moon className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      description: 'Represents consciousness, spirituality, and expansion',
      properties: ['Consciousness', 'Spirituality', 'Expansion', 'Vastness']
    }
  ];

  const directions = [
    {
      name: 'North (Uttar)',
      deity: 'Kubera',
      element: 'Water',
      color: 'from-blue-500 to-cyan-500',
      description: 'Wealth and prosperity direction',
      bestFor: ['Treasury', 'Safe', 'Water sources', 'Study room']
    },
    {
      name: 'South (Dakshin)',
      deity: 'Yama',
      element: 'Fire',
      color: 'from-red-500 to-orange-500',
      description: 'Strength and stability direction',
      bestFor: ['Kitchen', 'Dining room', 'Staircase', 'Heavy equipment']
    },
    {
      name: 'East (Purva)',
      deity: 'Indra',
      element: 'Air',
      color: 'from-green-500 to-teal-500',
      description: 'Health and family direction',
      bestFor: ['Main entrance', 'Prayer room', 'Living room', 'Bathroom']
    },
    {
      name: 'West (Paschim)',
      deity: 'Varuna',
      element: 'Water',
      color: 'from-blue-500 to-purple-500',
      description: 'Creativity and children direction',
      bestFor: ['Children\'s room', 'Study room', 'Creative space', 'Bedroom']
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Comprehensive Knowledge',
      description: 'Access detailed information about Vaastu principles, elements, directions, and their applications in modern architecture.'
    },
    {
      icon: <Compass className="w-12 h-12" />,
      title: 'Interactive Diagrams',
      description: 'Explore interactive Vaastu diagrams with animations and detailed explanations of each direction and element.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Expert Consultation',
      description: 'Connect with certified Vaastu consultants for personalized advice on your property and design plans.'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Real-time Chat',
      description: 'Chat with experts and get instant answers to your Vaastu-related questions and concerns.'
    }
  ];

  const benefits = [
    'Improved health and well-being',
    'Enhanced prosperity and wealth',
    'Better relationships and harmony',
    'Increased productivity and success',
    'Peaceful and positive environment',
    'Balanced energy flow',
    'Reduced stress and anxiety',
    'Better sleep quality'
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Vaastu Shaastra - Ancient Wisdom for Modern Living</title>
        <meta name="description" content="Discover the ancient science of Vaastu Shastra with comprehensive information, interactive diagrams, and expert consultation services for harmonious living." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 vaastu-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
              Vaastu <span className="text-yellow-300">Shaastra</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
              Ancient Wisdom for Modern Living - Discover the science of harmonious architecture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vaastu-info" className="btn-primary text-lg px-8 py-4">
                Explore Vaastu
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link to="/consultation" className="btn-secondary text-lg px-8 py-4">
                Get Consultation
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full opacity-20"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 vaastu-gradient-text">
              Why Choose Vaastu Shaastra?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of ancient wisdom and modern technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center group hover:scale-105"
              >
                <div className="vaastu-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Elements Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 vaastu-gradient-text">
              The Five Elements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the fundamental building blocks of Vaastu Shastra
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {elements.map((element, index) => (
              <ElementCard key={index} element={element} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 vaastu-gradient-text">
              The Four Directions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each direction has its own significance and ruling deity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {directions.map((direction, index) => (
              <DirectionCard key={index} direction={direction} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Vaastu Diagram */}
      <section className="section-padding bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 vaastu-gradient-text">
              Interactive Vaastu Diagram
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the Vastu Purusha Mandala and understand the cosmic energy grid
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <VaastuDiagram />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Benefits of Vaastu Shastra
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Transform your living space and life with the ancient science of Vaastu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of people who have already benefited from Vaastu Shastra principles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link to="/chat" className="btn-secondary text-lg px-8 py-4">
                Chat with Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
