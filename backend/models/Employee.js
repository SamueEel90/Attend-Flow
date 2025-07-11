const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['VOD', 'VO', 'VST', 'PPO', 'Admin'], 
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: Number,
    required: true,
    unique: true,   
  },
}, { collection: 'Employees' });

module.exports = mongoose.model('Employee', employeeSchema);
