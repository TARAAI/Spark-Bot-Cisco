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


//Additional Questions Module 


//bot.hears(['hello', 'hi','are you there'], function(message) {
//  bot.say('Hi there! I’m TARA, an intelligent product builder. What software would you like to build today?', message);
//});

bot.hears(['who are you','are you human','are you a bot','are you AI','are you ai','what are you'], function(message) {
  bot.say('I\'m TARA, an intelligent product builder. Let me know how I can help build your next custom software platform. I am built upon a community of 50,000 vetted developers and designers. Start by requesting a website, app or software tool and I will assign a team to work on your project. I am live on Cisco Spark and on www.tara.ai', message);
});

bot.hears(['hello','hi','hey','are you there'], function(message) {
  bot.say('Hi there! I\'m TARA, an intelligent product builder. Let me know how I can help build your next custom software platform. I am built upon a community of 50,000 vetted developers and designers. Start by requesting a website, app or software tool and I will assign a team to work on your project. I am live on Cisco Spark and on www.tara.ai', message);
});

bot.hears(['what technology makes you work','how does it work','how are you made','how do you work'], function(message) {
  bot.say('I cannot reveal the inner workings of my machine learning intelligence :)', message);
});

bot.hears(['what do you do','what can you help me with','what can i do with tara','help','what can you do','what is TARA'], function(message) {
  bot.say('Just let me know what sort of project you\'re looking to launch, and I\'ll provide you with an expert (or a team of experts) to get started on your work. For e.g. I can find you developers and build mobile apps and websites. Let\'s get started, I\'d love to hear more about what you\'re looking to build', message);
});

bot.hears(['which company do you belong to','who do you work for','more information about tara','what company are you','what company do you belong to'], function(message) {
  bot.say('I am TARA, a product of TARA Labs. Our office is located at 1879 Lundy Ave in San Jose, CA. I am live on www.tara.ai, you can also drop me a line at tara@trytara.com', message);
});

bot.hears(['Can I have more information'], function(message) {
  bot.say('You can speak to any of our customer service reps or technical account managers at 888-250-8960, or email us at info@trytara.com for more info.', message);
});

bot.hears(['who are your customers','customers','past projects','example projects','success stories','references','built previously','things you built'], function(message) {
  bot.say('Here are a few of our recent customer success stories, and how they utilized TARA: https://tara.ai/software-success-stories/', message);
});

bot.hears(['Can you send me the NDA','Non disclosure agreement','Non-disclosure agreement','NDA'], function(message) {
  bot.say('Here\'s our NDA https://tara.ai/nda-form', message);
});

bot.hears(['robot','spaceship','flying cars','tank','flying car','boat'], function(message) {
  bot.say('Maybe in 2038. Right now, my capabilities lie in software :)', message);
});

bot.hears(['machine vision','cognitive app','artificial intelligence','AI app'], function(message) {
  bot.say('I\'m sorry the project is not available in my knowledge base. Please click on the below link to schedule a quick call with one of our product managers. Thanks! https://calendly.com/trytara', message);
});

bot.hears(['nude','sex','fuck','hungry','hot','coffee','sandwich','food'], function(message) {
  bot.say('I sense trolling. Unfortunately, I cannot continue with this conversation. Thank you for chatting with me, goodbye!', message);
});

bot.hears(['how much','cost','rate','quote','price'], function(message) {
  bot.say('Rates are dependent on project type. And we usually provide a fixed quote.', message);
});

bot.hears(['feedback','good job','doing good','well done','excellent','i like you','amazing'], function(message) {
  bot.say('Thank you for your feedback.', message);
});

bot.hears(['link','submit link','send you a link','send link','send wireframe','submit design','submit wireframe','how do i submit a link','how do i submit a design'], function(message) {
  bot.say('Please go right ahead. To submit a link, just send the hyperlink through this interface. To submit attachments, click on the right attachment icon', message);
});

bot.hears(['thanks','thank you'], function(message) {
  bot.say('You\’re welcome.', message);
});

bot.hears(['join tara','become contractor','sign up','become a contractor','freelancer','join network','i\m a developer'], function(message) {
  bot.say('To sign up as part of our network of freelancers, please send us an email using our contact us form. http://tara.ai/contact-us/', message);
});

bot.hears(['what is backend','what is back-end','what is back end'], function(message) {
  bot.say('Is the infrastructure and framework already built? Hosting, domain name, database, etc?', message);
});

bot.hears(['what is spark'], function(message) {
  bot.say('Spark is where all your work lives. For more information on Spark, visit www.ciscospark.com', message);
});

bot.hears(['do you like spark'], function(message) {
  bot.say('The Spark Team has been so kind to me! I’m finding this environment very hospitable', message);
});

bot.hears(['i need an app','i want an app','i need a app','i want a app','build me an app','build me a app'], function(message) {
  bot.say('Please let me know if you need a mobile app or a web app.', message);
});
//Website Functional Questions


bot.hears(['web app','web application','application web','web development','web interface','wordpress website','wordpress','wordpress site','shopify','squarespace','build me a website','website'], function(message) {
  bot.startConversation(message, askSpecs);
});

askSpecs = function(response, convo) {
  convo.ask("Great! Let's get you started. Can you tell me more about functionality i.e. how it works? Or provide me with specs?", function(response, convo) {
    console.log("-----you should say awesome----");
    convo.say("Awesome. Got it");
    askSite(response, convo);
    convo.next();
  });
}

askSite = function(response, convo) {
  convo.ask("Is this a new site or an existing site you want to make changes to?", function(response, convo) {
    convo.say("Ok. Noted")
    askfeorbe(response, convo);
    convo.next();
  });
}

askfeorbe = function(response, convo) {
  convo.ask("Do you need front-end and back-end work done?", function(response, convo) {
    convo.say("Understood");
    askuiux(response, convo);
    convo.next();
  });
}

askuiux = function(response,convo) {
  convo.ask("Do you need support with the UI/UX Design? If yes, how extensive should the design be (i.e. basic vs full-fledged).", function(response,convo) {
    convo.say("Got it.");
    asklinks(response,convo);
    convo.next();
  });
}

asklinks = function(response,convo) {
  convo.ask("Awesome. Can you send me a few links so I can better understand what exactly you're looking for, in terms of functionality and/or design?", function(response,convo) {
    convo.say("Thanks!");
    asktimeline(response,convo);
    convo.next();
  });
}

asktimeline = function(response,convo) {
  convo.ask("Do you have a timeline in mind?", function(response,convo) {
    convo.say("Understood.");
    asksched(response,convo);
    convo.next();
  });
}

asksched = function(response,convo) {
  convo.say("How about we schedule a call with one of the Tara PMs to understand your project scope? Please click on the below link to schedule a quick call with one of our product managers. Thanks! https://calendly.com/trytara", function(response,convo) {
  });
}

//Mobile App Questions 

bot.hears(['mobile app','smartphone app','application','mobile application','smart phone application','ios app','android app','app development','app developer','mobile developer','ios developer','android developer'], function(message) {
  bot.startConversation(message, askplatform);
});

askplatform = function(response, convo) {
  convo.ask("Do you need iOS or Android? Or would you like iOS first, and then have the app ported to Android?", function(response, convo) {
    console.log("-----you should say awesome----");
    convo.say("Awesome. Got it");
    askSpecmob(response, convo);
    convo.next();
  });
}

askSpecmob = function(response, convo) {
  convo.ask("Great! Let's get you started. Can you tell me more about functionality i.e. how it works? Or provide me with specs?", function(response, convo) {
    convo.say("Ok. Noted")
    askfeorbemob(response, convo);
    convo.next();
  });
}

askfeorbemob = function(response, convo) {
  convo.ask("Do you need front-end and back-end work done?", function(response, convo) {
    convo.say("Understood");
    askprofiles(response, convo);
    convo.next();
  });
}

askprofiles = function(response,convo) {
  convo.ask("Does your app need user profiles?", function(response,convo) {
    convo.say("Got it.");
    askuiuxmob(response,convo);
    convo.next();
  });
}

askuiuxmob = function(response,convo) {
  convo.ask("Do you need support with the UI/UX Design? If yes, how extensive should the design be (i.e. basic vs full-fledged).", function(response,convo) {
    convo.say("Thanks!");
    asktimelinemob(response,convo);
    convo.next();
  });
}

asktimelinemob = function(response,convo) {
  convo.ask("Do you have a timeline in mind?", function(response,convo) {
    convo.say("Understood.");
    askschedmob(response,convo);
    convo.next();
  });
}

askschedmob = function(response,convo) {
  convo.ask("How about we schedule a call with one of the Tara PMs to understand your project scope? Please click on the below link to schedule a quick call with one of our product managers. Thanks! https://calendly.com/trytara", function(response,convo) {
    convo.say("Thanks for chatting with me today! Please let me know if there is anything else I can do to help with your future projects :)");
    convo.next();
  });
}





