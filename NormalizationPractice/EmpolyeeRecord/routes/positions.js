const express = require('express');
const router = express.Router();
const Position = require('../models/position');

// GET all positions
router.get('/', async (req, res) => {
  try {
    const positions = await Position.find().populate('departmentId');
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new position
router.post('/', async (req, res) => {
  const position = new Position(req.body);
  try {
    const newPosition = await position.save();
    res.status(201).json(newPosition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional CRUD operations...

module.exports = router;