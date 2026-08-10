const express = require('express');
const mongoose = require('mongoose');

const NOT_FOUND = 404;
const ADDRESS_NOT_FOUND_MESSAGE = 'Requested resource not found';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '6a58260663f388da8152d8f6',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: ADDRESS_NOT_FOUND_MESSAGE });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
