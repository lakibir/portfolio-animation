const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, trim: true },
  position: { type: String, trim: true },
  company: { type: String, default: '' },
  quote: { type: String, required: true },
  initials: { type: String, default: 'CL' },
  avatarClass: { type: String, default: 'avatar-1' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

testimonialSchema.pre('validate', function() {
  if (!this.role && this.position) {
    this.role = this.position;
  }
  if (!this.position && this.role) {
    this.position = this.role;
  }
  if (!this.role && !this.position) {
    this.role = 'Client / Colleague';
    this.position = 'Client / Colleague';
  }
  if (!this.initials && this.name) {
    this.initials = this.name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2) || 'CL';
  }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
