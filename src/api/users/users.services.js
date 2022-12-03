const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email_user: email,
    },
    select: {
      id_user: true,
      passwd_user: true,
      role_user: true,
      ativo_user: true
    },

  });
}

function createUserByEmailAndPassword(user) {
  user.passwd_user = bcrypt.hashSync(user.passwd_user, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id_user: id,
    },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword
};
