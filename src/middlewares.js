const jwt = require('jsonwebtoken');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const isAuthenticated = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  // eslint-disable-next-line prefer-arrow-callback
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('🚫 Un-Authorized 🚫');
    }

    req.userId = decoded.user.id_user;
    req.passwd = decoded.user.passwd_user;
    req.email = decoded.user.email_user;
    req.user = decoded.user.user_user;
    next();
  });
};

const isActive = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  // eslint-disable-next-line prefer-arrow-callback
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('🚫 Un-Authorized 🚫');
    }
    // console.log(decoded);
    req.ativo = decoded.user.ativo_user;
    req.role = decoded.user.role_user;
    next();
  });
};

module.exports = {
  notFound,
  errorHandler,
  isAuthenticated,
  isActive
};
