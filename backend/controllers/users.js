const User = require('../models/user');

const BAD_REQUEST = 400;
const VALIDATION_ERROR_MESSAGE = 'Validation failed';
const NOT_FOUND = 404;
const ADDRESS_NOT_FOUND_MESSAGE = 'User ID not found';
const INTERNAL_SERVER_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'An error has occurred on the server';

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: ADDRESS_NOT_FOUND_MESSAGE });
      }
      return res.send({ data: user });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: ADDRESS_NOT_FOUND_MESSAGE });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: ADDRESS_NOT_FOUND_MESSAGE });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};
