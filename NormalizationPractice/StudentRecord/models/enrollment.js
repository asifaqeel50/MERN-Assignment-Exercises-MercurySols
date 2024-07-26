const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    grade: String,
    semester: String,
    year: Number
  });
  
  module.exports = mongoose.model('Enrollment', enrollmentSchema);