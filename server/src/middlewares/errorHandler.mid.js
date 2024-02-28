const errorHandler = function errorHandler(error, req, res, next) {
  console.log(error);

  let statusCode = error.statusCode || 500;
  let message = error.message;

  // Si es un error de validación de Mongoose, agregamos más detalles al mensaje
  if (error.errors) {
    const validationErrors = Object.keys(error.errors).map((key) => ({
      field: key,
      message: error.errors[key].message,
    }));
    message += " - Validation Errors: " + JSON.stringify(validationErrors);
  }

  return res.status(statusCode).json({
    statusCode,
    message,
  });
};

export default errorHandler;
