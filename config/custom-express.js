/*
 * Arquivo: custom-express.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo que carrega o express.
 *              Além disso o mesmo define porta, entre outras configurações.
 * Data: 28/11/2017
 */
 var express = require('express');
 var consign = require('consign');
 var bodyParser = require('body-parser');
 var expressValidator = require('express-validator');
 var morgan = require('morgan');
 var logger = require('../tasks/logger.js');

 module.exports = function(){
   var app = express();

   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

   app.set('port', process.env.PORT || 3002);

   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.text());
   app.use(bodyParser.json({ type: 'application/json' }));

   app.use(expressValidator());

   consign()
    .include('tasks')
    .then('routes')
    .into(app);

   return app;
 }
