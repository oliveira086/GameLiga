var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController.js');
const estadoController = require('../controllers/estadoController')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getEstados', estadoController.getEstado)
router.post('/createEstados', estadoController.createEstado)
router.post('/deleteEstados', estadoController.deleteEstado)

router.post('/login',loginController.login)

module.exports = router;
