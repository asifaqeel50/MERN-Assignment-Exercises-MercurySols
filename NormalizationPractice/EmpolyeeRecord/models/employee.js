const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: Date,
  address: String,
  currentPositionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

module.exports = mongoose.model('Employee', employeeSchema);