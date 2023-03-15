const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const {
  createPlataforma, listPlataformaIdAdmin, listPlataformaIdComum,
  listPlataformaIdConvidado, buscaPlataformaAdmin, buscaPlataformaComum,
  buscaPlataformaConvidado,
  deletePlataforma, updatePlataforma, listAllPlataformaAdmin,
  listAllPlataformaComum, listProjtAllPlataformaId,
  listAllPlataformaConvidados, listProjtPlataformaId,
} = require('./plataforma.services');

const router = express.Router();

router.get('/', isAuthenticated, isActive, async (req, res, next) => {
  try {
    if (req.ativo) {
      if (req.role === 2) {
        res.status(200).json(await listAllPlataformaConvidados());
      } else if (req.role === 0) {
        res.status(200).json(await listAllPlataformaComum());
      } else {
        res.status(200).json(await listAllPlataformaAdmin());
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
        res.status(200).json(await listPlataformaIdConvidado(parseInt(id, 10)));
      } else if (req.role === 0) {
        res.status(200).json(await listPlataformaIdComum(parseInt(id, 10)));
      } else {
        res.status(200).json(await listPlataformaIdAdmin(parseInt(id, 10)));
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
    const {
      nome, alias, active_plataforma, inf_plataforma, host_projt_id, privatePlat,
    } = req.body;
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      } else {
        const plataforma = {
          nome_plataforma: nome,
          alias_plataforma: alias,
          active_plataforma,
          inf_plataforma,
          host_projt_id,
          private_plataforma: privatePlat,

        };
        const plataformaCR = await createPlataforma(plataforma);
        res.status(200).json(plataformaCR);
      }
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/api/busca', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { search } = req.query;

    if (req.ativo) {
      if (req.role === 2) {
        res.status(200).json(await buscaPlataformaConvidado(search));
      } else if (req.role === 0) {
        res.status(200).json(await buscaPlataformaComum(search));
      } else {
        res.status(200).json(await buscaPlataformaAdmin(search));
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

router.get('/projeto/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {
      res.status(200).json(await listProjtPlataformaId(parseInt(id, 10)));

      // res.json(user);
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/projetoall/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {
      res.status(200).json(await listProjtAllPlataformaId(parseInt(id, 10)));

      // res.json(user);
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
        const plataformaDel = await deletePlataforma(parseInt(id, 10));
        res.status(200).json(plataformaDel);
      }
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
      nome, alias, active_plataforma, inf_plataforma, host_projt_id, privatePlat,
    } = req.body;
    const plataforma = {
      id: parseInt(id, 10),
      nome_plataforma: nome,
      alias_plataforma: alias,
      active_plataforma,
      inf_plataforma,
      host_projt_id,
      private_plataforma: privatePlat,
    };

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }
      const updatePlat = await updatePlataforma(plataforma);
      res.status(200).json(updatePlat);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
