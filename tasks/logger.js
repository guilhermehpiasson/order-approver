/*
 * Arquivo: logger.js
 * Author: Guilherme Henrique Piasson
 * Description: Arquivo com configurações a cerca da gestão de log baseadas no winston.
 * Data: 28/11/2017
 */
var winston = require('winston');
var fs = require('fs');

if(!fs.existsSync('logs')){
  fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/order-approver.log",
      maxsize: 100000,
      maxFiles: 10
    })
  ]
});
