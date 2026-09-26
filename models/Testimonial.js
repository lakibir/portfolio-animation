const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  company: { type: String, default: '' },
  quote: { type: String, required: true },
  initials: { type: String, default: 'CL' },
  avatarClass: { type: String, default: 'avatar-1' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
