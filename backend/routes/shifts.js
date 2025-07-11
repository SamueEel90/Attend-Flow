const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');

router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    console.log(`Fetching shifts for date: ${date.toISOString()} to ${nextDate.toISOString()}`);

    // Bez populate, userId ostane ID string
    const shifts = await Shift.find({
      shiftDate: {
        $gte: date,
        $lt: nextDate
      }
    });

    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;