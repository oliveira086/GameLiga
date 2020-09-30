var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController.js');
const atividadesController = require('../controllers/atividadesController')
const transferenciaController = require('../controllers/transferenciasControllers')
const listasController = require('../controllers/listasController.js')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createListas', listasController.createListas)

router.post('/getAtividades', atividadesController.getAtividades)
router.post('/getAtividadesTodo', atividadesController.getAtividadesTodo)
router.post('/getAtividadesUser', atividadesController.getAtividadesUser)
router.post('/createAtividades', atividadesController.createAtividade)
router.post('/deleteAtividades', atividadesController.deleteAtividade)
router.post('/buyAtividade', atividadesController.buyAtividade)
router.post('/changeList', atividadesController.changeList)

router.post('/sendTransferencia', transferenciaController.sendTransferencia)
router.post('/getTransferencias', transferenciaController.getTransferencias)
router.post('/getContatos', transferenciaController.getContatos)
router.post('/getLatest', transferenciaController.getLatest)

router.post('/login',loginController.login)

module.exports = router;
