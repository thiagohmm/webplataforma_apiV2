const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const {
  findUserById, deleteUser, listAllUsers, countNewUsers, getNewUsers,
  updateUser, aproveUser, changePasswd,
} = require('./users.services');

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

router.get('/countNewUser', isAuthenticated, isActive, async (req, res, next) => {
  try {
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      res.status(200).json(await countNewUsers());
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/getNewUser', isAuthenticated, isActive, async (req, res, next) => {
  try {
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      res.status(200).json(await getNewUsers());
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.put('/update/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      passwd_user, role_user, ativo_user, mudaPasswd,
    } = req.body;

    const userPasswd = {
      id_user: parseInt(id, 10),
      passwd_user,
      role_user,
      ativo_user,
    };

    const userRole = {
      id_user: parseInt(id, 10),
      role_user,
      ativo_user,
    };

    if (req.ativo) {
      // changePasswd
      if (mudaPasswd) {
        const changepasswd = await changePasswd(userPasswd);
        res.status(200).json(changepasswd);
      } else {
        const updateNode = await updateUser(userRole);
        res.status(200).json(updateNode);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.put('/aproveUser/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = {
      id_user: parseInt(id, 10),
      ativo_user: true,
    };
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      const updateNode = await aproveUser(user);
      res.status(200).json(updateNode);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {
      res.status(200).json(await findUserById(parseInt(id, 10)));
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
