const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  description: { type: String, required: true },
  image: { type: String, default: 'image/project-1.jpg' },
  liveDemoUrl: { type: String, default: '#contact' },
  liveUrl: { type: String },
  githubUrl: { type: String, default: 'https://github.com/lakibir' },
  metrics: { type: String, default: '' },
  techStack: [{ type: String }],
  tags: [{ type: String }],
  highlights: [{ label: String, val: String }],
  features: [{ type: String }],
  overview: {
    problem: { type: String },
    solution: { type: String }
  },
  roles: [{
    name: { type: String },
    description: { type: String }
  }],
  modules: [{ type: String }],
  technicalFeatures: [{ type: String }],
  projectGoals: [{ type: String }],
  developmentFocus: [{ type: String }],
  portfolioTags: [{ type: String }],
  apiArchitecture: { type: mongoose.Schema.Types.Mixed },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

projectSchema.pre('save', function() {
  if (this.liveUrl && !this.liveDemoUrl) this.liveDemoUrl = this.liveUrl;
  if (this.liveDemoUrl && !this.liveUrl) this.liveUrl = this.liveDemoUrl;
  if (this.tags && this.tags.length && (!this.techStack || !this.techStack.length)) {
    this.techStack = this.tags;
  }
  if (this.techStack && this.techStack.length && (!this.tags || !this.tags.length)) {
    this.tags = this.techStack;
  }
  if (this.features && this.features.length && (!this.highlights || !this.highlights.length)) {
    this.highlights = this.features.map(f => {
      const parts = f.split(':');
      if (parts.length > 1) {
        return { label: parts[0].trim(), val: parts.slice(1).join(':').trim() };
      }
      return { label: 'Feature', val: f.trim() };
    });
  }
  if (this.highlights && this.highlights.length && (!this.features || !this.features.length)) {
    this.features = this.highlights.map(h => (h.label && h.val) ? `${h.label}: ${h.val}` : (h.val || h.label || ''));
  }
});

module.exports = mongoose.model('Project', projectSchema);
