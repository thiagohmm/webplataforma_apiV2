const express = require('express');
const bcrypt = require('bcrypt');

const {
  findUserByEmail,
  createUserByEmailAndPassword,

} = require('../users/users.services');
const { generateToken } = require('../../utils/jwt');
const {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenByUser,
  updaterefreshTokenToWhitelist
} = require('./auth.services');
// const { hashToken } = require('../../utils/hashToken');
const { isAuthenticated } = require('../../middlewares');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    let role = '';

    const { email, passwd } = req.body;
    if (!email || !passwd) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const emailAddress = email.toLowerCase();
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email já está sendo usado');
    }

    if (emailAddress.indexOf('atech.com.br') > -1) {
      // true if the address contains yahoo.com
      role = 0;
    } else {
      role = 2;
    }
    const dados = {
      email_user: emailAddress,
      passwd_user: passwd,
      role_user: role

    };

    const user = await createUserByEmailAndPassword(dados);

    const accessToken = generateToken(user);
    await addRefreshTokenToWhitelist({ accestoken: accessToken, userId: user.id_user });

    res.json({
      accessToken,

    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, passwd } = req.body;
    if (!email || !passwd) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(passwd, existingUser.passwd_user);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }
    const accessToken = generateToken(existingUser);

    const existedToken = await findRefreshTokenByUser(existingUser.id_user);

    if (existedToken) {
      // eslint-disable-next-line max-len
      await updaterefreshTokenToWhitelist({ accestoken: accessToken, id: existedToken.id });
    } else {
      await addRefreshTokenToWhitelist({ accestoken: accessToken, userId: existingUser.id_user });
    }
    res.json({
      accessToken,

    });
  } catch (err) {
    next(err);
  }
});

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
router.post('/logout', isAuthenticated, async (req, res, next) => {
  try {
    // const { email } = req.body;
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('You must provide an email');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }
    const existedToken = await findRefreshTokenByUser(existingUser.id_user);

    await deleteRefreshToken(existedToken.id);
    res.json({ message: `Tokens revoked for user with id #${existingUser.id_user}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
