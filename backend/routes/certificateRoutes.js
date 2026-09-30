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

// Helper to sanitize certificate body
function sanitizeCertificatePayload(body) {
  const data = { ...body };
  if (data.title) data.title = String(data.title).trim();
  if (data.issuer) data.issuer = String(data.issuer).trim();
  if (data.credentialId) data.credentialId = String(data.credentialId).trim();
  if (data.issueYear) data.issueYear = String(data.issueYear).trim();
  if (data.year) data.year = String(data.year).trim();
  
  // validUntil is completely optional - fallback to Perpetual / Lifetime if empty
  if (data.validUntil !== undefined) {
    data.validUntil = String(data.validUntil).trim() || 'Perpetual';
  } else {
    data.validUntil = 'Perpetual';
  }

  if (typeof data.skills === 'string') {
    data.skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
    data.skillsTags = data.skills;
  } else if (typeof data.skillsTags === 'string') {
    data.skillsTags = data.skillsTags.split(',').map(s => s.trim()).filter(Boolean);
    data.skills = data.skillsTags;
  }

  return data;
}

// POST create certificate
router.post('/', async (req, res) => {
  try {
    const payload = sanitizeCertificatePayload(req.body);
    const cert = new Certificate(payload);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update certificate
router.put('/:id', async (req, res) => {
  try {
    const payload = sanitizeCertificatePayload(req.body);
    const cert = await Certificate.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
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
