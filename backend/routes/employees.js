const express = require('express');
const router = express.Router();
const Employees = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const users = await Employees.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Chyba pri načítaní používateľov', error });
  }
});

module.exports = router;