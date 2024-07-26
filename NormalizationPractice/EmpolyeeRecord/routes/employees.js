const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const EmploymentHistory = require('../models/employmentHistory');
const mongoose = require('mongoose');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate({
        path: 'currentPositionId',
        populate: { path: 'departmentId' }
      })
      .populate('managerId', 'name');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET employee's employment history
router.get('/:id/history', async (req, res) => {
  try {
    const history = await EmploymentHistory.find({ employeeId: req.params.id })
      .populate('positionId')
      .sort({ startDate: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new employee
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { currentPosition, salary, ...employeeData } = req.body;
    
    const employee = new Employee(employeeData);
    await employee.save({ session });

    const employmentHistory = new EmploymentHistory({
      employeeId: employee._id,
      positionId: currentPosition,
      startDate: new Date(),
      salary
    });
    await employmentHistory.save({ session });

    employee.currentPositionId = currentPosition;
    await employee.save({ session });

    await session.commitTransaction();
    res.status(201).json(employee);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

// Additional CRUD operations...

module.exports = router;