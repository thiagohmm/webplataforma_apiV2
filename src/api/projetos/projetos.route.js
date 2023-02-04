const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const {
  listAllProjetosAdmin, listAllProjetosComum,
  listAllProjetosConvidados, listProjetosId, createProjetos, updateProjetos, deleteProjetos,
} = require('./projetos.services');

const router = express.Router();

router.get('/', isAuthenticated, isActive, async (req, res, next) => {
  try {
    if (req.ativo) {
      if (req.role === 2) {
        res.status(200).json(await listAllProjetosConvidados());
      } else if (req.role === 0) {
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
        const projeto = await listProjetosId(parseInt(id, 10));

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
    const { nome, privateProj } = req.body;
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      } else {
        const projetos = {
          nome_projeto: nome,
          private_projeto: parseInt(privateProj, 10),
        };
        console.log(projetos);
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

router.put('/update/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, privateProj } = req.body;

    const projetos = {
      id_projeto: parseInt(id, 10),
      nome_projeto: nome,
      private_projeto: privateProj,
    };

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      } else {
        if (parseInt(privateProj, 10) > 2) {
          console.log('caiu aqui no if', privateProj);
          res.status(401).json({ erro: 'erro de parametro' });
        }
        const updateProj = await updateProjetos(projetos);
        res.status(200).json(updateProj);
      }
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
        const projetoDel = await deleteProjetos(parseInt(id, 10));
        res.status(200).json(projetoDel);
      }
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
