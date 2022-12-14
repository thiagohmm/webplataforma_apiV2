const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');
const {
  createPlataforma, listPlataformaIdAdmin, listPlataformaIdComum,
  listPlataformaIdConvidado, buscaPlataformaAdmin, buscaPlataformaComum,
  buscaPlataformaConvidado,
  deletePlataforma, updatePlataforma
} = require('./plataforma.services');

const router = express.Router();


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
      nome, alias, active_plataforma, inf_plataforma, host_projt_id, privatePlat
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
          private_plataforma: privatePlat

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


router.get('/projeto/:projt_id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {

      res.status(200).json(await listProjtPlataformaId(parseInt(projt_id, 10)));


      // res.json(user);
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/projetoall/:projt_id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {

      res.status(200).json(await listProjtAllPlataformaId(parseInt(projt_id, 10)));


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
    const { nome_plataforma, alias, active_plataforma, inf_plataforma, host_projt_id, private_plataforma } = req.body;

    const plataforma = {
      id: parseInt(id, 10),
      nome_plataforma,
      private_plataforma,
      host_projt_id,
      inf_plataforma,
      active_plataforma,
      alias_plataforma: alias
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
