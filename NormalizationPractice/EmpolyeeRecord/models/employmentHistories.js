const mongoose = require('mongoose');

const employmentHistorySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  salary: Number
});

module.exports = mongoose.model('EmploymentHistory', employmentHistorySchema);