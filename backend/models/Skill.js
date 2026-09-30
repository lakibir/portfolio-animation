const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: 'General' },
  proficiencyPct: { type: Number, default: 90 },
  level: { type: Number, default: 90 },
  iconColor: { type: String, default: '#ff5018' },
  color: { type: String, default: '#ff5018' },
  iconSvg: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

skillSchema.pre('save', function() {
  if (typeof this.level === 'number' && typeof this.proficiencyPct !== 'number') {
    this.proficiencyPct = this.level;
  }
  if (typeof this.proficiencyPct === 'number') {
    this.level = this.proficiencyPct;
  }
  if (this.color && !this.iconColor) this.iconColor = this.color;
  if (this.iconColor && !this.color) this.color = this.iconColor;
});

module.exports = mongoose.model('Skill', skillSchema);
