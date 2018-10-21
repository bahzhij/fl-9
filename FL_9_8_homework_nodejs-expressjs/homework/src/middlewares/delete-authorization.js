const deleteAuthorization = function(req, res, next) {
  if (req.method === 'DELETE' && req.headers.authorization !== 'X-Password qwerty') {
    res.status(401).send('Unauthorized');
  }
  next();
  };

module.exports = deleteAuthorization;