// routes/cardInteractions.js
const express = require('express');
const router = express.Router();
const CardInteraction = require('../models/CardInteraction');


router.get('/', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Parameter date je povinný.' });
  }
  try {
    // filter podľa shiftDate
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const interactions = await CardInteraction.find({
      timestamp: { $gte: start, $lt: end }
    });
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ error: 'Chyba servera' });
  }
});

router.get('/userID', async (req, res) => {
  const userId = req.query.userId;
  console.log('Received userId:', userId);

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const interactions = await CardInteraction.find({ userId: userId });

    console.log(`Hľadám interakcie pre userId: ${userId}`);
    console.log(`Nájdené interakcie: ${interactions.length}`);

    return res.json(interactions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
