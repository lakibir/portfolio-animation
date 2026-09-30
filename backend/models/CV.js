const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  title: { type: String, default: 'Lekibir Mulatu - Resume / CV' },
  fileName: { type: String, default: 'lekibir-resume.jpg' },
  fileUrl: { type: String, default: 'image/credentials/lekibir-resume.jpg' },
  fileType: { type: String, default: 'image/jpeg' },
  fileSize: { type: String, default: '216 KB' },
  isDefault: { type: Boolean, default: true },
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);
