const mongoose = require('mongoose');

const urlRegex =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]*#?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, 'User avatar is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
