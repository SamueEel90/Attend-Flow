const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const employeesRoute = require('./routes/employees');
const cardInteractionsRoute = require('./routes/cardInteractions');
const tasksRoute = require('./routes/tasks'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/employees', employeesRoute);
app.use('/api/cardinteractions', cardInteractionsRoute);
app.use('/api/tasks', tasksRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
