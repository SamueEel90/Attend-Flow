const mongoose = require('mongoose');

const cardInteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift',
    required: true,
  },
  employeeNumber: Number,
  name: String,
  location: String,
  action: {
    type: String,
    enum: ['začiatok_zmeny', 'koniec_zmeny', 'prestávka', 'návrat'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'CardInteractions' });

module.exports = mongoose.model('CardInteraction', cardInteractionSchema);
