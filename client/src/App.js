import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import VaastuInfo from './pages/VaastuInfo';
import Diagrams from './pages/Diagrams';
import Remedies from './pages/Remedies';
import Consultation from './pages/Consultation';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Helmet>
        <title>Vaastu Shaastra - Ancient Wisdom for Modern Living</title>
        <meta name="description" content="Discover the ancient science of Vaastu Shastra with comprehensive information, interactive diagrams, and expert consultation services." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vaastu-info" element={<VaastuInfo />} />
          <Route path="/diagrams" element={<Diagrams />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
