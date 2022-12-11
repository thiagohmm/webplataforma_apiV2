const express = require('express');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const projetos = require('./projetos/projetos.route');
const plataforma = require('./plataforma/plataforma.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/projetos', projetos);
router.use('/plataforma', plataforma);

module.exports = router;
