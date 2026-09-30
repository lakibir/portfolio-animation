const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, required: true, trim: true },
  credentialId: { type: String, trim: true },
  issueYear: { type: String, default: '2024' },
  year: { type: String },
  validUntil: { type: String, default: 'Perpetual' },
  skillsTags: [{ type: String }],
  skills: [{ type: String }],
  logoType: { type: String, default: 'aws' },
  verifyUrl: { type: String, default: '#contact' },
  fileUrl: { type: String },
  image: { type: String },
  status: { type: String, default: 'Verified' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

certificateSchema.pre('save', function () {
  if (this.year && !this.issueYear) this.issueYear = this.year;
  if (this.issueYear && !this.year) this.year = this.issueYear;
  if (this.skills && this.skills.length && (!this.skillsTags || !this.skillsTags.length)) {
    this.skillsTags = this.skills;
  }
  if (this.skillsTags && this.skillsTags.length && (!this.skills || !this.skills.length)) {
    this.skills = this.skillsTags;
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);
