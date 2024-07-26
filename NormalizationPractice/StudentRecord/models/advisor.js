const advisorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    email: { type: String, required: true, unique: true }
  });
  
  module.exports = mongoose.model('Advisor', advisorSchema);