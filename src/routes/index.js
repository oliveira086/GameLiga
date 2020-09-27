var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController.js');
const estadoController = require('../controllers/estadoController');
const atividadesController = require('../controllers/atividadesController')
const transferenciaController = require('../controllers/transferenciasControllers')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getEstados', estadoController.getEstado)
router.post('/createEstados', estadoController.createEstado)
router.post('/deleteEstados', estadoController.deleteEstado)

router.post('/getAtividades', atividadesController.getAtividades)
router.post('/getAtividadesUser', atividadesController.getAtividadesUser)
router.post('/createAtividades', atividadesController.createAtividade)
router.post('/deleteAtividades', atividadesController.deleteAtividade)
router.post('/buyAtividade', atividadesController.buyAtividade)

router.post('/sendTransferencia', transferenciaController.sendTransferencia)
router.post('/getTransferencias', transferenciaController.getTransferencias)

router.post('/login',loginController.login)

module.exports = router;
