// En producción la clave secreta llega desde el archivo .env del servidor.
// En desarrollo usamos una de reserva para que el proyecto arranque sin .env,
// tal y como pide el brief.
const { NODE_ENV, JWT_SECRET, PORT = 3000, DB_URL } = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = {
  PORT,
  JWT_SECRET: isProduction ? JWT_SECRET : 'dev-secret-key',
  DB_URL: DB_URL || 'mongodb://localhost:27017/aroundb',
  JWT_EXPIRATION: '7d',
};
