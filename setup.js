const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Vaastu Shaastra - Project Setup');
console.log('=====================================\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v16 or higher.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm.');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env file...');
  
  let envContent = '';
  
  if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, 'utf8');
  } else {
    // Default .env content
    envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/vaastu-shaastra

# Authentication
JWT_SECRET=vaastu-shaastra-super-secret-key-2024
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
`;
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully');
} else {
  console.log('✅ .env file already exists');
}

// Install server dependencies
console.log('\n📦 Installing server dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Server dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install server dependencies');
  process.exit(1);
}

// Install client dependencies
console.log('\n📦 Installing client dependencies...');
try {
  execSync('npm run install-client', { stdio: 'inherit' });
  console.log('✅ Client dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install client dependencies');
  process.exit(1);
}

// Create necessary directories
const directories = ['uploads', 'logs'];
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Update the .env file with your specific configuration');
console.log('3. Run the application:');
console.log('   - Development mode: npm run dev');
console.log('   - Or run separately:');
console.log('     * Terminal 1: npm run server');
console.log('     * Terminal 2: npm run client');
console.log('\n🌐 Access the application:');
console.log('- Frontend: http://localhost:3000');
console.log('- Backend API: http://localhost:5000');
console.log('\n🔐 Default test users:');
console.log('- Admin: admin@vaastu.com / admin123');
console.log('- Consultant: consultant@vaastu.com / consultant123');
console.log('- User: user@vaastu.com / user123');
console.log('\nHappy Vaastu Learning! 🏠✨');
