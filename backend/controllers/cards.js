const Card = require('../models/card');

const BAD_REQUEST = 400;
const VALIDATION_ERROR_MESSAGE = 'Validation failed';
const NOT_FOUND = 404;
const CARD_NOT_FOUND_MESSAGE = 'Card ID not found';
const INTERNAL_SERVER_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'An error has occurred on the server';

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};
