var logger = require('../tasks/logger.js');

var request = require('request');

module.exports = function(app){

  app.get('/teste', function(req, res){
    console.log(req.query.project);
    res.status(200).json("OK");
  });

  app.post('/order/payment/approver', function(req, res){

    try{

      var response = new Object();
      var order = req.body;

      response.amount = order.amount;
      response.orderId = order.orderId;

      var profile = new Object();
      profile.phoneNumber = order.profile.phoneNumber;
      profile.id = order.profile.id;
      profile.email = order.profile.email;
      response.profile = profile;

      response.channel = order.channel;
      response.locale = order.locale;
      response.transactionId = order.transactionId;
      response.transactionTimestamp = order.transactionTimestamp;
      //response.transactionType = order.transactionType;
      response.paymentId = order.paymentId;

      var cardDetails = new Object();
      cardDetails.expirationYear = order.cardDetails.expirationYear;
      cardDetails.number = order.cardDetails.number;
      cardDetails.holderName = order.cardDetails.holderName;
      cardDetails.cvv = order.cardDetails.cvv;
      cardDetails.expirationMonth = order.cardDetails.expirationMonth;
      cardDetails.type = order.cardDetails.type;

      response.paymentMethod = order.paymentMethod;

      response.merchantTransactionTimestamp ="1447807667046";
      response.currencyCode =  "BRL";
      response.PONumber = "po22222";
      response.referenceNumber = "pg10415";
      response.organizationId = "or-300007";
      response.transactionType = "0100";

      var authorizationResponse = new Object();
      authorizationResponse.hostTransactionId = order.transactionId;
      authorizationResponse.responseCode = "1000";
      authorizationResponse.responseReason = "1001";
      authorizationResponse.responseDescription = "1002";
      authorizationResponse.authorizationCode = "s001";
      authorizationResponse.merchantTransactionId = "2016-06-23T10:39:03+0000";
      response.authorizationResponse = authorizationResponse;

      response.gatewayId = "mundipaggpayment";

      console.log("\n REQUEST: " + JSON.stringify(req.body));
	    logger.error("REQUEST:" + req.body);
      console.log("\n HEADER: " + JSON.stringify(req.headers));
      logger.error("HEADER:" + req.headers);
      console.log("\n RESPONSE: " + JSON.stringify(response));

      res.status(200).json(response);

    }catch(error) {
      console.log("ERRO: REQUEST - order.payment.approver: " + JSON.stringify(req.body));
      console.log("ERRO: HEADER - order.payment.approver: " + JSON.stringify(req.headers));
      console.log("ERRO: " + error);
      res.status(400).json(error);
    }
  });

  app.post('/order/approver', function(req, res){

    try{

      var response = new Object();

      response.approvalAction = "true";
      response.approvalActionReason = "Approved";

      console.log("\n REQUEST: " + req.body);
      logger.error("REQUEST:" + req.body);

      console.log("\n HEADER: " + JSON.stringify(req.headers));
      logger.error("HEADER:" + req.headers);

      res.status(200).json(response);
    }catch(error) {
      logger.error("ERRO - order.approver:" + error);
      console.log("ERRO - order.approver: " + error);
      res.status(400).json(error);
    }
  });

}
