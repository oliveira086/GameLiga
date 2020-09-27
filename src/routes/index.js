var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController.js');
const estadoController = require('../controllers/estadoController');
const atividadesController = require('../controllers/atividadesController')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getEstados', estadoController.getEstado)
router.post('/createEstados', estadoController.createEstado)
router.post('/deleteEstados', estadoController.deleteEstado)

router.post('/getAtividades', atividadesController.getAtividades)
router.post('/createAtividades', atividadesController.createAtividade)
router.post('/deleteAtividades', atividadesController.deleteAtividade)

router.post('/login',loginController.login)

module.exports = router;
