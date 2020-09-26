var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',loginController.login)

module.exports = router;
