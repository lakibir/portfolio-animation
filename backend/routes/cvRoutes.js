const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const CV = require('../models/CV');

const CREDENTIALS_DIR = path.join(__dirname, '..', '..', 'frontend', 'image', 'credentials');

// Ensure credentials upload directory exists
if (!fs.existsSync(CREDENTIALS_DIR)) {
  fs.mkdirSync(CREDENTIALS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CREDENTIALS_DIR);
  },
  filename: (req, file, cb) => {
    // Generate clean sanitized filename with timestamp
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `cv_${Date.now()}_${baseName}${ext}`);
  }
});

// Allow PDF, JPG, PNG, WEBP, DOCX
const fileFilter = (req, file, cb) => {
  const allowed = /\.(pdf|jpg|jpeg|png|webp|docx|doc)$/i;
  if (allowed.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, JPEG, PNG, WEBP, and DOCX files are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter
});

// Helper to format file size
function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// GET active CV info (includes cache-busting timestamp and directUrl)
router.get('/', async (req, res) => {
  try {
    let cv = await CV.findOne().sort({ updatedAt: -1 });
    if (!cv) {
      // Seed default record
      cv = new CV({
        title: 'Lekibir Mulatu - Resume / CV',
        fileName: 'lekibir-resume.jpg',
        fileUrl: 'image/credentials/lekibir-resume.jpg',
        fileType: 'image/jpeg',
        fileSize: '216 KB',
        isDefault: true,
        uploadedAt: new Date()
      });
      await cv.save();
    }
    const cvObj = cv.toObject();
    const timestamp = cv.updatedAt ? new Date(cv.updatedAt).getTime() : Date.now();
    cvObj.timestamp = timestamp;
    cvObj.directUrl = cv.fileUrl.startsWith('http')
      ? cv.fileUrl
      : `${cv.fileUrl.startsWith('/') ? cv.fileUrl : '/' + cv.fileUrl}?t=${timestamp}`;
    res.json(cvObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cv/view - Direct redirection with cache-busting
router.get('/view', async (req, res) => {
  try {
    let cv = await CV.findOne().sort({ updatedAt: -1 });
    const fileUrl = (cv && cv.fileUrl) ? cv.fileUrl : 'image/credentials/lekibir-resume.jpg';
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
      return res.redirect(fileUrl);
    }
    const cleanPath = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
    const timestamp = cv && cv.updatedAt ? new Date(cv.updatedAt).getTime() : Date.now();
    return res.redirect(`${cleanPath}?t=${timestamp}`);
  } catch (err) {
    return res.redirect('/image/credentials/lekibir-resume.jpg');
  }
});

// GET /api/cv/download - Direct file download for visitors
router.get('/download', async (req, res) => {
  try {
    let cv = await CV.findOne().sort({ updatedAt: -1 });
    if (!cv || !cv.fileUrl || cv.fileUrl.startsWith('http')) {
      return res.redirect(cv && cv.fileUrl ? cv.fileUrl : '/cv');
    }
    const cleanRel = cv.fileUrl.replace(/^\//, '');
    const filePath = path.join(__dirname, '..', '..', 'frontend', cleanRel);
    if (fs.existsSync(filePath)) {
      return res.download(filePath, cv.fileName || path.basename(filePath));
    }
    return res.redirect(`/${cleanRel}`);
  } catch (err) {
    return res.redirect('/cv');
  }
});

// POST upload new CV file
router.post('/upload', upload.single('cvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const relativeUrl = `image/credentials/${req.file.filename}`;
    const fileSizeStr = formatBytes(req.file.size);

    let cv = await CV.findOne().sort({ updatedAt: -1 });
    if (!cv) {
      cv = new CV();
    }

    cv.fileName = req.file.originalname;
    cv.fileUrl = relativeUrl;
    cv.fileType = req.file.mimetype || 'application/octet-stream';
    cv.fileSize = fileSizeStr;
    cv.isDefault = false;
    cv.uploadedAt = new Date();

    await cv.save();

    res.json({
      success: true,
      message: 'CV uploaded and updated successfully!',
      data: cv
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update CV link or title manually (e.g. Google Drive or custom URL)
router.put('/', async (req, res) => {
  try {
    const { fileUrl, title, fileName } = req.body;
    if (!fileUrl) {
      return res.status(400).json({ error: 'fileUrl is required' });
    }

    let cv = await CV.findOne().sort({ updatedAt: -1 });
    if (!cv) {
      cv = new CV();
    }

    cv.fileUrl = fileUrl.trim();
    if (title) cv.title = title.trim();
    if (fileName) cv.fileName = fileName.trim();
    cv.isDefault = false;
    cv.uploadedAt = new Date();

    await cv.save();

    res.json({
      success: true,
      message: 'CV URL updated successfully!',
      data: cv
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST reset to default resume
router.post('/reset', async (req, res) => {
  try {
    let cv = await CV.findOne().sort({ updatedAt: -1 });
    if (!cv) {
      cv = new CV();
    }

    cv.title = 'Lekibir Mulatu - Resume / CV';
    cv.fileName = 'lekibir-resume.jpg';
    cv.fileUrl = 'image/credentials/lekibir-resume.jpg';
    cv.fileType = 'image/jpeg';
    cv.fileSize = '216 KB';
    cv.isDefault = true;
    cv.uploadedAt = new Date();

    await cv.save();

    res.json({
      success: true,
      message: 'CV reset to default portfolio resume!',
      data: cv
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
