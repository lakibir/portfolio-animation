const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Helper to sanitize experience payload
function sanitizeExperiencePayload(body) {
  const data = { ...body };
  if (data.role) data.role = String(data.role).trim();
  if (data.company) data.company = String(data.company).trim();
  if (data.startDate) data.startDate = String(data.startDate).trim();
  if (data.endDate) data.endDate = String(data.endDate).trim();
  if (data.duration) data.duration = String(data.duration).trim();
  if (data.location) data.location = String(data.location).trim();
  if (data.icon) data.icon = String(data.icon).trim();
  if (data.badge) data.badge = String(data.badge).trim();
  
  // Combine start and end date if available
  if (data.startDate && data.endDate) {
    data.duration = `${data.startDate} – ${data.endDate}`;
  } else if (data.duration && (!data.startDate || !data.endDate)) {
    const parts = data.duration.split(/[-–—]/);
    if (parts.length >= 2) {
      if (!data.startDate) data.startDate = parts[0].trim();
      if (!data.endDate) data.endDate = parts.slice(1).join('–').trim();
    }
  }

  if (data.duration && !data.period) data.period = data.duration;
  if (!data.badge && data.duration) data.badge = data.duration;

  if (typeof data.highlights === 'string') {
    data.highlights = data.highlights
      .split('\n')
      .map(s => s.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean);
  } else if (!Array.isArray(data.highlights)) {
    data.highlights = [];
  }

  if (data.isCurrent !== undefined) {
    data.isCurrent = data.isCurrent === true || data.isCurrent === 'true' || data.isCurrent === 1 || data.isCurrent === '1';
  } else if (data.duration) {
    data.isCurrent = data.duration.toLowerCase().includes('present');
  }

  if (data.order !== undefined) {
    data.order = parseInt(data.order, 10) || 1;
  }

  return data;
}

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create experience
router.post('/', async (req, res) => {
  try {
    const payload = sanitizeExperiencePayload(req.body);
    const exp = new Experience(payload);
    await exp.save();
    res.status(201).json(exp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update experience
router.put('/:id', async (req, res) => {
  try {
    const payload = sanitizeExperiencePayload(req.body);
    const exp = await Experience.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!exp) return res.status(404).json({ error: 'Experience not found' });
    res.json(exp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE experience
router.delete('/:id', async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Experience not found' });
    res.json({ message: 'Experience successfully deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
