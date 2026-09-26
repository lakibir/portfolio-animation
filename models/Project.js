const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  description: { type: String, required: true },
  image: { type: String, default: 'image/project-1.jpg' },
  liveDemoUrl: { type: String, default: '#contact' },
  githubUrl: { type: String, default: 'https://github.com' },
  metrics: { type: String, default: '' },
  techStack: [{ type: String }],
  highlights: [{ label: String, val: String }],
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
