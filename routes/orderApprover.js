var request = require('request');

module.exports = function(app){

  app.get('/teste', function(req, res){
    console.log(req.query.project);
    res.status(200).json("OK");
  });

  app.post('/order/approver', function(req, res){
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
      response.transactionType = "AUTH";

      var authorizationResponse = new Object();
      authorizationResponse.hostTransactionId = "HOST-TRANSACTION-ID";
      authorizationResponse.responseCode = "1000";
      authorizationResponse.responseReason = "1002";
      authorizationResponse.responseDescription = "Valid PO Number";
      authorizationResponse.merchantTransactionId = "2016-06-23T10:39:03+0000";
      response.authorizationResponse = authorizationResponse;

      response.gatewayId = "gatewayDemo";

      console.log("\n REQUEST: " + JSON.stringify(req.body));
      console.log("\n HEADER: " + JSON.stringify(req.headers));
      console.log("\n RESPONSE: " + JSON.stringify(req.body));

      res.status(200).json(response);

    }catch(error) {
      console.log("ERRO - REQUEST - order.approver: " + JSON.stringify(req.body));
      console.log("HEADER: " + JSON.stringify(req.headers));
      console.log("ERRO: " + error);
      res.status(400).json(error);
    }
  });

}
