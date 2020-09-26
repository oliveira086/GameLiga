var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/userController')

/* GET users listing. */
router.post('/cadastro', usuarioController.createUser);

module.exports = router;
