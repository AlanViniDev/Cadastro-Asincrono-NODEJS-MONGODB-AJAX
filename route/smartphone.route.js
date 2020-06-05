const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Colocar controller que ainda não foi criado
const smartphone_controller = require("../control/smartphone.controller.js");
const view_controller =  require("../control/view.controller.js");

//rotas
router.post('/create', smartphone_controller.smartphone_create);
router.get('/index', view_controller.view);

module.exports = router;  
