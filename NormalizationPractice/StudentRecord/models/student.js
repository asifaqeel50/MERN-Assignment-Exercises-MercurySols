const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  majorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Major' },
  advisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advisor' },
  graduationYear: Number
});