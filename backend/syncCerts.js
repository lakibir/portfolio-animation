const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) { }

const Certificate = require('./models/Certificate');
const { initialCertificates } = require('./seedData');

let rawUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
let MONGODB_URI = rawUri.replace(/<([^>]+)>/g, '$1').trim();

async function run() {
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
    console.log('Connected! Updating certificates (removing recommendations)...');

    await Certificate.deleteMany({});
    const inserted = await Certificate.insertMany(initialCertificates);

    console.log(`Successfully synced ${inserted.length} genuine certificates in MongoDB:`);
    inserted.forEach((c, idx) => {
      console.log(`[${idx + 1}] ${c.title} -> ${c.fileUrl || c.image}`);
    });

    await mongoose.disconnect();
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error syncing certificates:', err.message);
    process.exit(1);
  }
}

run();
