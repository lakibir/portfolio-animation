const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: 'General' }, // 'Frontend', 'Backend', 'Database', 'Cloud & DevOps'
  proficiencyPct: { type: Number, default: 90 },
  iconColor: { type: String, default: '#ff5018' },
  iconSvg: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
