/*
 * Simple bot that echoes new Cisco Spark messages to the console
 *
 * Illustrates a REST Webhook
 *
 */
var SparkBot = require("../lib");

var config = {
  /// Cisco Spark API token, note that it is mandatory for webhooks to decode new messages
  //token: 'MzAyZjNkZWMtN2FiZi00N2ZlLWFmNDgtZDYxODQ0MThiNjY0ODJiZDI4ODUtMTY1',
  token: 'NmUyZGZlOTQtYjQ1ZS00NGYzLWFmOGMtY2ViZDRiOTBlOTUyYjIzYzQ5MzYtMGM1',
  port: 8888,
  //domain:'http://localhost',
  domain:'http://sparkbotvm.westus.cloudapp.azure.com',
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

bot.hears(['hello', 'hi'], function(message) {
  bot.say('hi', message);
});

bot.hears(['thanks', 'thank you'], function(message) {
  bot.say('You are welcome', message);
});


//Pizza Module

bot.hears('pizzatime', function(message) {
  bot.startConversation(message, askFlavor);
});

askFlavor = function(response, convo) {
  convo.ask("What flavor of pizza do you want?", function(response, convo) {
    console.log("-----you should say awesome----");
    convo.say("Awesome.");
    askSize(response, convo);
    convo.next();
  });
}
askSize = function(response, convo) {
  convo.ask("What size do you want?", function(response, convo) {
    convo.say("Ok.")
    askWhereDeliver(response, convo);
    convo.next();
  });
}
askWhereDeliver = function(response, convo) {
  convo.ask("So where do you want it delivered?", function(response, convo) {
    convo.say("Ok! Goodbye.");
    convo.next();
  });
}



