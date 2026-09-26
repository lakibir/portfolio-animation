const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Message = require('../models/Message');

const {
  initialProjects,
  initialCertificates,
  initialSkills,
  initialExperience,
  initialTestimonials
} = require('../seedData');

// GET overview statistics for Admin Dashboard
router.get('/', async (req, res) => {
  try {
    const [projectsCount, certsCount, skillsCount, expCount, testimonialsCount, unreadMessagesCount, totalMessagesCount] = await Promise.all([
      Project.countDocuments(),
      Certificate.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Testimonial.countDocuments(),
      Message.countDocuments({ read: false }),
      Message.countDocuments()
    ]);

    res.json({
      projects: projectsCount,
      certificates: certsCount,
      skills: skillsCount,
      experience: expCount,
      testimonials: testimonialsCount,
      unreadMessages: unreadMessagesCount,
      totalMessages: totalMessagesCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST re-seed default portfolio database data
router.post('/reseed', async (req, res) => {
  try {
    // Clear and populate collections
    await Promise.all([
      Project.deleteMany({}),
      Certificate.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Testimonial.deleteMany({})
    ]);

    await Promise.all([
      Project.insertMany(initialProjects),
      Certificate.insertMany(initialCertificates),
      Skill.insertMany(initialSkills),
      Experience.insertMany(initialExperience),
      Testimonial.insertMany(initialTestimonials)
    ]);

    res.json({
      success: true,
      message: 'Portfolio MongoDB database successfully seeded with initial projects, certificates, skills, experience, and testimonials!'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
