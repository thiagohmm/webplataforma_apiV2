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
      ativo_user: true,
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

async function deleteUser(id) {
  return db.user.delete({
    where: {
      id_user: id,
    },
  });
}

async function listAllUsers() {
  return db.user.findMany();
}

async function countNewUsers() {
  return db.user.count({
    where: {
      ativo_user: false,
    },

  });
}

async function getNewUsers() {
  return db.user.findMany({
    where: {
      ativo_user: false,
    },

  });
}

async function updateUser(user) {
  return db.user.update({
    where: {
      id_user: user.id_user,
    },
    data:
      user,

  });
}

async function aproveUser(user) {
  return db.user.update({
    where: {
      id_user: user.id_user,
    },
    data:
      user,

  });
}

async function changePasswd(user) {
  user.passwd_user = bcrypt.hashSync(user.passwd_user, 12);
  return db.user.update({
    where: {
      id_user: user.id_user,
    },
    data:
      user,

  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  deleteUser,
  listAllUsers,
  countNewUsers,
  getNewUsers,
  updateUser,
  aproveUser,
  changePasswd,
};
