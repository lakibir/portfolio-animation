const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects (sorted by order, then createdAt)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper to sanitize project body
function sanitizeProjectPayload(body) {
  const data = { ...body };
  if (data.title) data.title = String(data.title).trim();
  if (data.category) data.category = String(data.category).trim();
  if (data.subtitle) data.subtitle = String(data.subtitle).trim();
  if (data.description) data.description = String(data.description).trim();
  if (data.metrics) data.metrics = String(data.metrics).trim();

  // GitHub URL
  if (data.githubUrl !== undefined) {
    data.githubUrl = String(data.githubUrl).trim() || 'https://github.com/lakibir';
  } else if (!data.githubUrl) {
    data.githubUrl = 'https://github.com/lakibir';
  }

  // Live Demo URL
  if (data.liveDemoUrl !== undefined) {
    data.liveDemoUrl = String(data.liveDemoUrl).trim() || '#contact';
    data.liveUrl = data.liveDemoUrl;
  } else if (data.liveUrl !== undefined) {
    data.liveUrl = String(data.liveUrl).trim() || '#contact';
    data.liveDemoUrl = data.liveUrl;
  }

  // Tech stack / tags parsing
  if (typeof data.techStack === 'string') {
    data.techStack = data.techStack.split(',').map(s => s.trim()).filter(Boolean);
    data.tags = data.techStack;
  } else if (typeof data.tags === 'string') {
    data.tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
    data.techStack = data.tags;
  }

  // Professional Features parsing
  if (typeof data.features === 'string') {
    data.features = data.features
      .split('\n')
      .map(s => s.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean);
  } else if (!Array.isArray(data.features)) {
    data.features = [];
  }

  if (data.featured !== undefined) {
    data.featured = data.featured === true || data.featured === 'true' || data.featured === 1 || data.featured === '1';
  }

  if (data.order !== undefined) {
    data.order = parseInt(data.order, 10) || 0;
  }

  return data;
}

// POST create project
router.post('/', async (req, res) => {
  try {
    const payload = sanitizeProjectPayload(req.body);
    const project = new Project(payload);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const payload = sanitizeProjectPayload(req.body);
    const project = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project successfully deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
