const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const CARD_NOT_FOUND_MESSAGE = 'No card found with that id';
const INVALID_ID_MESSAGE = 'The provided id is not valid';

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError(CARD_NOT_FOUND_MESSAGE))
    .then((card) => {
      // Nadie puede borrar una tarjeta que no ha creado.
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You cannot delete another user\'s card');
      }
      return Card.findByIdAndDelete(req.params.cardId).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_MESSAGE));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError(CARD_NOT_FOUND_MESSAGE))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_MESSAGE));
      }
      return next(err);
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError(CARD_NOT_FOUND_MESSAGE))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_MESSAGE));
      }
      return next(err);
    });
};
