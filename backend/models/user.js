const mongoose = require('mongoose');
const validator = require('validator');

const DEFAULT_NAME = 'Jacques Cousteau';
const DEFAULT_ABOUT = 'Explorador';
const DEFAULT_AVATAR =
  'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_ABOUT,
  },
  avatar: {
    type: String,
    default: DEFAULT_AVATAR,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // Sin esto, cualquier consulta al modelo devolvería el hash de la
    // contraseña. Para el inicio de sesión se recupera con .select('+password').
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
