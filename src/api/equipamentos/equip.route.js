const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');

const {
  createEquip,
  listEquipId,
  deleteEquip,
  updateEquip,
  listPlatEquipId,
} = require('./equip.service');

const router = express.Router();

router.get('/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      res.status(200).json(await listEquipId(parseInt(id, 10)));
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/plataforma/:equip_plat_id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { equip_plat_id } = req.params;

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      res.status(200).json(await listPlatEquipId(parseInt(equip_plat_id, 10)));
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
      nome, tipo, local, inf, url, equip_plat_id,
    } = req.body;

    const equip = {
      id_equip: parseInt(id, 10),
      nome_equip: nome,
      tipo_equip: tipo,
      local_equip: local,
      inf_equip: inf,
      url_equip: url,
      equip_plat_id,
    };
    
    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }
      const updatequip = await updateEquip(equip);
      res.status(200).json(updatequip);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/create', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const {
      nome, tipo, local, inf, url, equip_plat_id,
    } = req.body;

    const nodes = {

      nome_equip: nome,
      tipo_equip: tipo,
      local_equip: local,
      inf_equip: inf,
      url_equip: url,
      equip_plat_id: parseInt(equip_plat_id, 10),
    };

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }
      const createquip = await createEquip(nodes);
      res.status(200).json(createquip);
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
        const equipDel = await deleteEquip(parseInt(id, 10));
        res.status(200).json(equipDel);
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
