const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  email: String,
  role: String,
  username: String,
  department: String
});

module.exports = mongoose.model('Employee', employeeSchema);