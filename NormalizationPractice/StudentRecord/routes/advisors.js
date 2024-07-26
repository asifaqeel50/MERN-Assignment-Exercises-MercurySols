const express = require('express');
const router = express.Router();
const Advisor = require('../models/advisor');

// GET all advisors
router.get('/', async (req, res) => {
  try {
    const advisors = await Advisor.find();
    res.json(advisors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new advisor
router.post('/', async (req, res) => {
  const advisor = new Advisor(req.body);
  try {
    const newAdvisor = await advisor.save();
    res.status(201).json(newAdvisor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;