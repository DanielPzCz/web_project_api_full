const DEFAULT_ERROR_MESSAGE = 'An error has occurred on the server';

// Middleware de manejo centralizado de errores. Express lo reconoce como tal
// porque declara cuatro parámetros, así que `next` debe seguir presente aunque
// no se use (ver la excepción de no-unused-vars en .eslintrc).
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? DEFAULT_ERROR_MESSAGE : message,
  });
};
