const express = require('express');
const router = express.Router();
const EmploymentHistory = require('../models/employmentHistories');

// GET all employment histories
router.get('/', async (req, res) => {
  try {
    const histories = await EmploymentHistory.find()
      .populate('employeeId')
      .populate('positionId');
    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new employment history entry
router.post('/', async (req, res) => {
  const history = new EmploymentHistory(req.body);
  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional CRUD operations...

module.exports = router;