/**
 * Reseed MongoDB Database with Lekibir Mulatu's verified credentials and portfolio data
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) { }

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

let rawUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
let MONGODB_URI = rawUri.replace(/<([^>]+)>/g, '$1').trim();

async function runReseed() {
  try {
    console.log('Connecting to MongoDB...');
    try {
      await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
      console.log('Connected to Primary MongoDB!');
    } catch (atlasErr) {
      console.warn('Primary connection failed, attempting local fallback...');
      await mongoose.connect('mongodb://127.0.0.1:27017/portfolio_db', { serverSelectionTimeoutMS: 4000 });
      console.log('Connected to local MongoDB instance!');
    }
    console.log('Connected! Resetting collections...');

    await Promise.all([
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Testimonial.deleteMany({})
    ]);

    console.log('Inserting Lekibir Mulatu portfolio collections...');
    await Promise.all([
      Project.insertMany(initialProjects),
      Certificate.insertMany(initialCertificates),
      Skill.insertMany(initialSkills),
      Experience.insertMany(initialExperience),
      Testimonial.insertMany(initialTestimonials)
    ]);

    console.log('SUCCESS: All collections reseeded with Lekibir Mulatu data!');
    process.exit(0);
  } catch (err) {
    console.error('Reseed error:', err.message);
    process.exit(1);
  }
}

runReseed();
