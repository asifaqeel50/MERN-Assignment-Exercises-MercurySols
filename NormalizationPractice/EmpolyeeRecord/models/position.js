const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  baseSalary: Number
});

module.exports = mongoose.model('Position', positionSchema);