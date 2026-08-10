const mongoose = require('mongoose');

const urlRegex =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]*#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, 'User avatar is required'],
  },
});

module.exports = mongoose.model('user', userSchema);
