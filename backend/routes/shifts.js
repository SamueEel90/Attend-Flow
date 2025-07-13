const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');

// Existing: Fetch shifts by date
router.get('/date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    console.log(`Fetching shifts for date: ${date.toISOString()} to ${nextDate.toISOString()}`);

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

// NEW: Fetch shifts by userId and date
router.get('/user/:userId/date/:date', async (req, res) => {
  try {
    const userId = req.params.userId;
    const date = new Date(req.params.date);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    console.log(`Fetching shifts for user: ${userId} on date: ${date.toISOString()} to ${nextDate.toISOString()}`);

    const shifts = await Shift.find({
      userId: userId,
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