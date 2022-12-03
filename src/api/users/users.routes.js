const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const { findUserById } = require('./users.services');

const router = express.Router();

router.get('/profile', isAuthenticated, isActive, async (req, res, next) => {
  try {
    console.log(req.email, req.role);
    if (req.ativo) {
      const id = req.userId;

      const user = await findUserById(id);

      res.json(user);
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
