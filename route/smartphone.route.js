const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Colocar controller que ainda não foi criado
const smartphone_controller = require("../control/smartphone.controller.js");
const view_controller =  require("../control/view.controller.js");


router.get('/testar', smartphone_controller.testar); 
router.post('/create', smartphone_controller.smartphone_create);
router.put('/update', smartphone_controller.smartphone_update);
router.delete('/delete',smartphone_controller.smartphone_delete);
router.get('/listar',smartphone_controller.smartphone_listar);
router.get('/index', view_controller.view);
//router.get('/:id', smartphone_controller.details);
module.exports = router;  