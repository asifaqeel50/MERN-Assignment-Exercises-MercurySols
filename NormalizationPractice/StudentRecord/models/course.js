const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    name: { type: String, required: true }
  });
  
  module.exports = mongoose.model('Course', courseSchema);
  