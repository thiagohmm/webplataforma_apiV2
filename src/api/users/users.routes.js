const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const { findUserById, deleteUser, listAllUsers } = require('./users.services');

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

router.delete('/delete/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      } else {
        const nodesDel = await deleteUser(parseInt(id, 10));
        res.status(200).json(nodesDel);
      }
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/', isAuthenticated, isActive, async (req, res, next) => {
  try {
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      res.status(200).json(await listAllUsers());
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
