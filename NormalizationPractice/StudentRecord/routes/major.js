const express = require('express');
const router = express.Router();
const Major = require('../models/major');

// GET all majors
router.get('/', async (req, res) => {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new major
router.post('/', async (req, res) => {
  const major = new Major(req.body);
  try {
    const newMajor = await major.save();
    res.status(201).json(newMajor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;