const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  duration: { type: String, default: '2023 - Present' },
  location: { type: String, default: 'Remote' },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
