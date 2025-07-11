const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');

router.get('/userID', async (req, res) => {
  const userId = req.query.userId;
  console.log('Received userId:', userId);

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const tasks = await Task.find({ userId: objectUserId });

    console.log(`Hľadám úlohy pre userId: ${userId}`);
    console.log(`Nájdené úlohy: ${tasks.length}`);

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;