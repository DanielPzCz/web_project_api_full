const express = require('express');
const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { PORT, DB_URL } = require('./utils/config');

const app = express();

app.use(express.json());

mongoose.connect(DB_URL);

// Rutas públicas: son las únicas que quedan fuera de la autorización.
app.post('/signin', login);
app.post('/signup', createUser);

// A partir de aquí, toda petición necesita un JWT válido.
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
