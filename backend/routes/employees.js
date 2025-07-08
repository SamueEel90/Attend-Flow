const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  const users = await Employee.find();
  res.json(users);
});

module.exports = router;