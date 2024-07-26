const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new department
router.post('/', async (req, res) => {
  const department = new Department(req.body);
  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional CRUD operations...

module.exports = router;