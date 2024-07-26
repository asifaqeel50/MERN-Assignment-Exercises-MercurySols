const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Enrollment = require('../models/enrollment');

// GET all students with their advisor and major
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
      .populate('advisorId')
      .populate('majorId');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a student's enrollments
router.get('/:id/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.id })
      .populate('courseId');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;