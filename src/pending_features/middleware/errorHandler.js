const errorHandler = {
  handleError: (err, req, res, next) => {
      console.error(err.stack);
      
      if (err.name === 'ValidationError') {
          return res.status(400).json({
              message: 'Validation Error',
              errors: err.errors
          });
      }

      if (err.name === 'UnauthorizedError') {
          return res.status(401).json({
              message: 'Authentication Error',
              error: err.message
          });
      }

      res.status(err.status || 500).json({
          message: err.message || 'Internal Server Error',
          error: process.env.NODE_ENV === 'development' ? err : {}
      });
  }
};

module.exports = errorHandler;
