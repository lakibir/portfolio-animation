const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');

// GET all certificates
router.get('/', async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single certificate
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create certificate
router.post('/', async (req, res) => {
  try {
    const cert = new Certificate(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update certificate
router.put('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE certificate
router.delete('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json({ message: 'Certificate successfully deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
