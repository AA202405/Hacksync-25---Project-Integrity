const responseFormatter = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors
  if (err.name === 'MulterError') {
    return res.status(400).json(responseFormatter.error(
      'File upload error',
      err.message
    ));
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json(responseFormatter.error(
      'Validation error',
      err.message
    ));
  }

  // Default error
  res.status(err.status || 500).json(responseFormatter.error(
    err.message || 'Internal server error',
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  ));
};

module.exports = errorHandler;
