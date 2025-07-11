const mongoose = require('mongoose');

const cardInteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  employeeNumber: Number,
  name: String,
  department: String,
  location: String,
  action: {
    type: String,
    enum: ['začiatok_zmeny', 'koniec_zmeny', 'začiatok_prestávky', 'koniec_prestávky'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  
}, { collection: 'CardInteractions' });

module.exports = mongoose.model('CardInteraction', cardInteractionSchema);
