var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/userController')

/* GET users listing. */
router.post('/cadastro', usuarioController.createUser);
router.post('/getUser', usuarioController.getUser);
router.post('/getUserWithEmail', usuarioController.getUserWithEmail)
router.post('/getConfirmationPass', usuarioController.getConfirmationPass)
router.post('/saveConfirmationPass', usuarioController.saveConfirmationPass)
router.post('/updateConfirmationPass', usuarioController.updateConfirmationPass)
module.exports = router;
