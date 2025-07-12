const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',    
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  shiftDate: {
    type: Date,
    required: true,
  },
  shiftStart: {
    type: Date,
    required: true,
  },
  shiftEnd: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: false,
  },
  breakTime: {
    type: Number,      
    required: true,
  },
  arrivalConfirmed: {
    type: Boolean,
    default: false,
  },
  departureConfirmed: {
    type: Boolean,
    default: false,
  },
}, { collection: 'Shifts' });

module.exports = mongoose.model('Shift', shiftSchema);
