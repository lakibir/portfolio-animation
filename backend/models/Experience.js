const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  duration: { type: String, default: '2023 - Present' },
  period: { type: String, default: '2023 - Present' },
  location: { type: String, default: 'Addis Ababa, Ethiopia' },
  description: { type: mongoose.Schema.Types.Mixed, required: true },
  highlights: [{ type: String }],
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  icon: { type: String, default: '🚀' },
  badge: { type: String, default: '' },
  isCurrent: { type: Boolean, default: false },
  order: { type: Number, default: 1 }
}, { timestamps: true });

experienceSchema.pre('save', function() {
  if (this.startDate && this.endDate) {
    this.duration = `${this.startDate} – ${this.endDate}`;
  }
  if (this.period && !this.duration) this.duration = this.period;
  if (this.duration && !this.period) this.period = this.duration;
  if (!this.badge && this.duration) this.badge = this.duration;
  if (this.isCurrent === undefined && this.duration) {
    this.isCurrent = this.duration.toLowerCase().includes('present');
  }
  if (this.endDate && this.endDate.toLowerCase().includes('present')) {
    this.isCurrent = true;
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
