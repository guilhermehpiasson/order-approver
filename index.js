/*
 * Arquivo: index.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo principal e responsável por carregar as configuracões do express, configurações de log e iniciar a aplicação.
 * Data: 28/11/2017
 */

var app = require('./config/custom-express')();
var logger = require('./tasks/logger.js');

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
  logger.info('Express server listening on port ' + app.get('port'));
});
