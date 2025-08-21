# Vaastu Shaastra - Full Stack Website

A comprehensive full-stack website dedicated to Vaastu Shastra (Vedic Architecture) with interactive diagrams, real-time chat functionality, and consultation services.

## 🌟 Features

- **Interactive Vaastu Diagrams** - Explore the Vastu Purusha Mandala with clickable elements
- **Real-time Chat System** - Connect with Vaastu consultants instantly
- **Comprehensive Vaastu Information** - Complete database of principles, remedies, and calculations
- **User Authentication** - Secure login/registration system
- **Consultation Booking** - Schedule appointments with certified consultants
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Beautiful animations and intuitive interface

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Multer** - File uploads
- **Morgan** - Logging
- **Compression** - Response compression
- **Express Rate Limit** - API rate limiting

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time features
- **React Query** - Data fetching
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **GSAP** - Advanced animations
- **Three.js** - 3D graphics
- **React Dropzone** - File uploads

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vaastu-shaastra
```

### 2. Environment Setup
```bash
# Copy environment variables
cp env.example .env

# Edit .env file with your configuration
# Required variables:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (a secure random string)
# - PORT (server port, default: 5000)
```

### 3. Install Dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 4. Database Setup
```bash
# Make sure MongoDB is running
# For local development, start MongoDB service
# For production, use MongoDB Atlas or your preferred MongoDB service
```

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Run both server and client in development mode
npm run dev
```

#### Production Mode
```bash
# Build the client
npm run build

# Start the server
npm start
```

#### Alternative: Run Separately
```bash
# Terminal 1: Start the server
npm run server

# Terminal 2: Start the client
npm run client
```

## 📁 Project Structure

```
vaastu-shaastra/
├── models/                 # Database models
│   ├── User.js            # User schema
│   ├── Chat.js            # Chat schema
│   └── VaastuData.js      # Vaastu information schema
├── routes/                 # API routes
│   ├── auth.js            # Authentication routes
│   ├── chat.js            # Chat functionality routes
│   ├── vaastu.js          # Vaastu data routes
│   └── consultations.js   # Consultation routes
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── socket.js              # Socket.IO configuration
├── server.js              # Express server
├── package.json           # Backend dependencies
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables (.env)

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/vaastu-shaastra

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Client URL
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### MongoDB Setup

#### Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Create database: `vaastu-shaastra`

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🎯 Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run server     # Start only the server
```

### Frontend Scripts
```bash
npm run client     # Start React development server
npm run build      # Build for production
```

### Combined Scripts
```bash
npm run dev        # Start both server and client
npm run install-client  # Install client dependencies
npm run heroku-postbuild  # Build for deployment
```

## 🌐 Access the Application

After running the application:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

## 🔐 Default Users

The application includes some default data for testing:

### Admin User
- Email: admin@vaastu.com
- Password: admin123
- Role: admin

### Consultant User
- Email: consultant@vaastu.com
- Password: consultant123
- Role: consultant

### Regular User
- Email: user@vaastu.com
- Password: user123
- Role: user

## 📱 Features Overview

### 1. Home Page
- Hero section with animated elements
- Interactive Vaastu diagram
- Five elements showcase
- Four directions information
- Benefits and features

### 2. Vaastu Information
- Comprehensive database of Vaastu principles
- Interactive diagrams and animations
- Remedies and solutions
- Calculations and formulas

### 3. Chat System
- Real-time messaging
- File and image sharing
- Typing indicators
- Read receipts
- Online/offline status
- Vaastu-specific context

### 4. Consultation Services
- Book appointments with consultants
- View consultation history
- Reschedule/cancel appointments
- Property analysis requests

### 5. User Dashboard
- Profile management
- Chat history
- Consultation bookings
- Saved preferences

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process using port 5000
npx kill-port 5000

# Or change port in .env
PORT=5001
```

#### 2. MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

#### 3. Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Client Build Errors
```bash
# Clear React cache
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Development Tips

1. **Use the setup script**: `node setup.js` for automated setup
2. **Check logs**: Monitor server logs for errors
3. **Database**: Use MongoDB Compass for database management
4. **API Testing**: Use Postman or Thunder Client for API testing

## 🚀 Deployment

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git push heroku main
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Vastu Shastra principles and knowledge
- Open source community
- Contributors and supporters

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@vaastu-shaastra.com

## 🔮 Future Enhancements

- AI-powered Vaastu analysis
- 3D property visualization
- Mobile app development
- Advanced analytics dashboard
- Multi-language support
- Video consultation features

---

**Happy Vaastu Learning! 🏠✨**
#   v a a s t u s h a s t r a  
 