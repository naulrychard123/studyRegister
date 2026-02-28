const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.post('/create-register', controller.save)
router.get('consultar/data', controller.searchPerDate)
router.get('consulta/conteudo', controller.searchPerContent)



module.exports = { router }