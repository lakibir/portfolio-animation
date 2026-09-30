const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dns = require('dns');
// Load environment variables from backend directory or current directory
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

// Ensure SRV records resolve cleanly on Windows/all networks for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported in environment
}

const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Testimonial = require('./models/Testimonial');

const {
  initialProjects,
  initialCertificates,
  initialSkills,
  initialExperience,
  initialTestimonials
} = require('./seedData');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (essential for Render, Vercel, and Cloudflare)
app.set('trust proxy', 1);

let rawUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
let MONGODB_URI = rawUri.replace(/<([^>]+)>/g, '$1').trim();

// Ensure standard database name (portfolio_db) and retry parameters are present if omitted
if (MONGODB_URI.includes('.mongodb.net/?')) {
  MONGODB_URI = MONGODB_URI.replace('.mongodb.net/?', '.mongodb.net/portfolio_db?retryWrites=true&w=majority&');
} else if (MONGODB_URI.endsWith('.mongodb.net/')) {
  MONGODB_URI += 'portfolio_db?retryWrites=true&w=majority';
} else if (MONGODB_URI.endsWith('.mongodb.net')) {
  MONGODB_URI += '/portfolio_db?retryWrites=true&w=majority';
}

// Middleware: CORS configured for local, Vercel, and custom domains
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? '*' : corsOrigin.split(',').map(s => s.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Health check endpoint for Render zero-downtime monitoring and uptime checkers
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

// Serve static frontend files from the frontend directory (if co-located)
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(FRONTEND_DIR)) {
  app.use(express.static(FRONTEND_DIR));
}

// Auto-seed function when MongoDB connects
const autoSeedDatabase = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('⚡ Initializing portfolio database with default items...');
      await Promise.all([
        Project.insertMany(initialProjects),
        Certificate.insertMany(initialCertificates),
        Skill.insertMany(initialSkills),
        Experience.insertMany(initialExperience),
        Testimonial.insertMany(initialTestimonials)
      ]);
      console.log('✅ Database automatically seeded with 8 projects, 6 certificates, skills, experience, and testimonials!');
    } else {
      console.log(`ℹ️ Database already contains ${projectCount} projects. Ready!`);
    }
  } catch (err) {
    console.error('⚠️ Auto-seed check error:', err.message);
  }
};

// Connect to MongoDB with fallback
const connectDB = async () => {
  try {
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 7000 });
    console.log(`🌿 Connected to MongoDB Atlas successfully!`);
    await autoSeedDatabase();
  } catch (err) {
    console.error('⚠️ Primary MongoDB Connection Error:', err.message);
    if (MONGODB_URI !== 'mongodb://127.0.0.1:27017/portfolio_db') {
      console.log('🔄 Attempting fallback to local MongoDB instance...');
      try {
        await mongoose.connect('mongodb://127.0.0.1:27017/portfolio_db', { serverSelectionTimeoutMS: 4000 });
        console.log('🌿 Connected to local MongoDB instance!');
        await autoSeedDatabase();
      } catch (localErr) {
        console.error('❌ Local MongoDB fallback also failed:', localErr.message);
      }
    }
  }
};

connectDB();

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/cv', require('./routes/cvRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Direct CV / Resume shortcuts (resolves directly to the latest CV in database with cache-busting)
app.get(['/cv', '/resume', '/api/cv/view'], async (req, res) => {
  try {
    const CV = require('./models/CV');
    const cv = await CV.findOne().sort({ updatedAt: -1 });
    const fileUrl = (cv && cv.fileUrl) ? cv.fileUrl : 'image/credentials/lekibir-resume.jpg';

    // If external link (Google Drive, OneDrive, etc.)
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
      return res.redirect(fileUrl);
    }

    const cleanPath = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
    const timestamp = cv && cv.updatedAt ? new Date(cv.updatedAt).getTime() : Date.now();
    return res.redirect(`${cleanPath}?t=${timestamp}`);
  } catch (err) {
    return res.redirect('/image/credentials/lekibir-resume.jpg');
  }
});

// Direct CV download shortcut
app.get(['/download-cv', '/cv/download'], (req, res) => {
  return res.redirect('/api/cv/download');
});

// Convenience routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'admin.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'projects.html'));
});

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Folioblox Portfolio Server running on: http://localhost:${PORT}`);
  console.log(`📁 Portfolio Home:     http://localhost:${PORT}/index.html`);
  console.log(`🚀 Projects Showcase:  http://localhost:${PORT}/projects.html`);
  console.log(`⚙️ Admin Dashboard:   http://localhost:${PORT}/admin.html`);
  console.log(`🌿 MongoDB Database:   ${MONGODB_URI}`);
  console.log(`====================================================`);
});
