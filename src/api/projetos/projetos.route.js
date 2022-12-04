const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const {
  listAllProjetosAdmin, listAllProjetosComum,
  listAllProjetosConvidados, listProjetosId, createProjetos
} = require('./projetos.services');

const router = express.Router();

router.get('/', isAuthenticated, isActive, async (req, res, next) => {
  try {
    if (req.ativo) {
      if (req.role === 2) {
        res.status(200).json(await listAllProjetosConvidados());
      } else if (req.role === 0) {
        console.log('caiuu aqui');
        res.status(200).json(await listAllProjetosComum());
      } else {
        res.status(200).json(await listAllProjetosAdmin());
      }

      // res.json(user);
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {
      if (req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      } else {
        console.log('Caiu aquiii');
        const projeto = await listProjetosId(parseInt(id, 10));
        console.log(projeto);
        res.json(projeto);
      }

      // res.json(user);
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/create', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { nome } = req.body;
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      } else {
        const projetos = {
          nome_projeto: nome,

        };
        const projeto = await createProjetos(projetos);
        res.status(200).json(projeto);
      }

      // res.json(user);
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
