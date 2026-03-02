const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.post('/create-register', controller.save)
router.get('/consultar/dia', controller.searchPerDia)
router.get('/consultar/conteudo', controller.searchPerContent)


module.exports = router
