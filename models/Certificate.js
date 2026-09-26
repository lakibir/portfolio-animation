const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, required: true, trim: true },
  credentialId: { type: String, trim: true },
  issueYear: { type: String, default: '2024' },
  validUntil: { type: String, default: 'Perpetual' },
  skillsTags: [{ type: String }],
  logoType: { type: String, default: 'aws' }, // 'aws', 'meta', 'gcp', 'mongodb', 'docker', 'postgres'
  verifyUrl: { type: String, default: '#contact' },
  status: { type: String, default: 'Verified' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
