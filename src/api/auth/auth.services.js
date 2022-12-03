const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');

function addRefreshTokenToWhitelist({ accestoken, userId }) {
  return db.refreshToken.create({
    data: {

      hashedToken: hashToken(accestoken),
      userId
    },
  });
}

function updaterefreshTokenToWhitelist({ accestoken, id }) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {

      hashedToken: hashToken(accestoken),

    },
  });
}

function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

function findRefreshTokenByUser(id) {
  return db.refreshToken.findFirst({
    where: {
      userId: id,
    }

  });
}

function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(id) {
  return db.refreshToken.updateMany({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
  updaterefreshTokenToWhitelist,
  findRefreshTokenByUser
};
