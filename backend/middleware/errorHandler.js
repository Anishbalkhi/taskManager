const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  res.status(500).json({ success: false, message: 'Server Error' });
};

module.exports = errorHandler;
