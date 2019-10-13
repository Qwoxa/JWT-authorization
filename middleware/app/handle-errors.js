module.exports = (err, req, res, next) => {
    if (err.headerSent) {
       next(err);
    }
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
       error: {
          message: err.message,
          statusCode
       }
    });
};