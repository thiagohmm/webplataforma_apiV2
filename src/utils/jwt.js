const jwt = require('jsonwebtoken');

function generateToken(param) {
  const token = jwt.sign({ user: param }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '80m' // expires in 5min
  });

  return token;
}

module.exports = {

  generateToken
};
