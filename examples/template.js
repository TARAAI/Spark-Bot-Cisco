/// This code will not work tell adjustments to var config 
/// This code will not work tell adjustments to var config 
/// This code will not work tell adjustments to var config 
/// This code will not work tell adjustments to var config 
/// This code will not work tell adjustments to var config 


var SparkBot = require("../lib");

var config = {
  /// Cisco Spark API token, note that it is mandatory for webhooks to decode new messages
  
  token: ///This number must be obtained from https://developer.ciscospark.com/,

  port: 8888, ///make sure this port is open

  domain: ///Insert your domain here,

  URI: "/webhook"
};

// Starts your Webhook
var bot = new SparkBot(config);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sparkbotdb');

var Message = require('./model/message.js');


bot.on_message(function(message) {

  var msg = new Message({
    msg_id: message.id,
    room_id: message.roomId,
    text: message.text,
    person_id: message.personId,
    person_email: message.personEmail,
    created_at: message.created
  })

  msg.save(function(err){
    if(err) throw err;

    console.log('Message saved successfully');
  })
});

///Anything Before this line is required for the code and can not be altered.
///Anything Before this line is required for the code and can not be altered.
///Anything Before this line is required for the code and can not be altered.
///Anything Before this line is required for the code and can not be altered.
///Anything Before this line is required for the code and can not be altered.

/// Example of simple response from Sparkbot. Sparkbot will wait for input 
/// consisting off either hello or hi and respond with hi. 
bot.hears(['hello','hi'], function(message){
  bot.say('hi',message);
});

///Example of simple conversation using module. 
bot.hears('pizzatime', function(message) {
  bot.startConversation(message, askFlavor); ///Connects to First Function
});

askFlavor = function(response, convo) {
  convo.ask("What flavor of pizza do you want?", function(response, convo) {
    convo.say("Awesome.");
    askSize(response, convo); ///Connecting to Next Function
    convo.next();
  });
}
askSize = function(response, convo) {
  convo.ask("What size do you want?", function(response, convo) {
    convo.say("Ok.")
    askCrust(response, convo); ///Connecting to Next Function
    convo.next();
  });
}
askCrust = function(response, convo) {
  convo.ask("What crust do you want?", function(response, convo) {
    convo.say("Ok.")
    askWhereDeliver(response, convo); ///Connecting to Next Function
    convo.next();
  });
}
askWhereDeliver = function(response, convo) {
  convo.ask("So where do you want it delivered?", function(response, convo) {
    convo.say("Ok! Goodbye.");
    convo.next();
  });
}