const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dns = require('dns');
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

// Sanitize MongoDB URI (strip accidental placeholder angle brackets < >)
let rawUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
let MONGODB_URI = rawUri.replace(/<([^>]+)>/g, '$1').trim();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

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
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Convenience routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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
