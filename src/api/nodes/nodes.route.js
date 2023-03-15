const express = require('express');
const { isAuthenticated, isActive } = require('../../middlewares');

const {
  createNodes,
  listNodesId,
  deleteNodes,
  updateNodes,
  listProjtAllNodesId,
} = require('./nodes.service');

const router = express.Router();

router.get('/:id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.ativo) {
      res.status(200).json(await listNodesId(parseInt(id, 10)));
    } else {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/plataforma/:host_plat_id', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const { host_plat_id } = req.params;

    if (req.ativo) {
      res.status(200).json(await listProjtAllNodesId(parseInt(host_plat_id, 10)));
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
      nome, ssh, vnc, router_node, rdp, host_plat_id,
    } = req.body;

    const nodes = {
      id_node: parseInt(id, 10),
      nome_node: nome,
      ssh_node: ssh,
      vnc_node: vnc,
      rdp_node: rdp,
      router_node,
      host_plat_id,
    };

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }

      const updateNode = await updateNodes(nodes);
      res.status(200).json(updateNode);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/create', isAuthenticated, isActive, async (req, res, next) => {
  try {
    const {
      nome, ssh, vnc, router_node, rdp, host_plat_id,
    } = req.body;

    const nodes = {
      nome_node: nome,
      ssh_node: ssh,
      vnc_node: vnc,
      rdp_node: rdp,
      router_node,
      host_plat_id,
    };

    if (req.ativo) {
      if (req.role === 0 || req.role === 2) {
        res.status(401).json({ erro: '🚫 Un-Authorized 🚫' });
      }
      const createNode = await createNodes(nodes);
      res.status(200).json(createNode);
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
        const nodesDel = await deleteNodes(parseInt(id, 10));
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

module.exports = router;
