const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment');

// GET all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId')
      .populate('courseId');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new enrollment
router.post('/', async (req, res) => {
  const enrollment = new Enrollment(req.body);
  try {
    const newEnrollment = await enrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;