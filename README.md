#Cisco Spark bot

##Installation
Use of Sparkbot requires installation of Node.js. (Node.js installation dependencies require superuser. Please note Node.js version v4.4.6 LTS or higher is required) Detailed information on Node.js installation can be found [here](https://nodejs.org/en/download/package-manager/). 

```
bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

After installing Node.js we need to obtain the Sparkbot source code. Code for Sparkbot can be obtained from [github repository](https://github.com/TARAAI/Spark-Bot-Cisco) or cloned through Git. Sample code can be found under the /sparkbot/examples folder.

```
bash
git clone https://github.com/TARAAI/Spark-Bot-Cisco.git
cd sparkbot
cd examples
```

Next, you will setup the Sparkbot. Please make sure npm is installed on your computer. If not, the installation command bellow will install npm for you.
```
bash
sudo apt-get install npm
```

Once npm is installed, you will need to setup localhost to run Sparkbot. The following commands will setup Sparkbot to localhost on port 8080. User can go to browser and access through [https://sparkbot.localtunnel.me](https://sparkbot.localtunnel.me).

```
bash
npm install -g localtunnel
lt -s sparkbot -p 8080
```

Your installation is complete and Sparkbot should be running.

##Using Sparkbot

Sparkbot comes with a predefined function that users can implement to create there own responses to inputs as well as a module function that allow for conversations. 

###Hear Function
Sparkbot will wait for a certain predefined input from the user and then respond with a message.  
```javascript
bot.hears(['input1','input2'], function(message){
  bot.say('output',message);
});
```
To determine what input Sparkbot is looking for, we need to adjust **"['input1','input2']"**. Any number of inputs can be given, as long as each input word is within its own single quotes and all words are seperated by a commas. 

Example Change
```javascript
"['hi','hello','Hola']".
```

To determine what output Sparkbot says in response to the input, simply change output **"bot.say('output',message);"** to whatever your pretermiend message.

Example Change 
```javascript
"bot.say('Hello, how is it going',message.);"
```

Some Examples
```javascript
bot.hears(['goodbye','bye','later'], function(message){
  bot.say('Have a wonderful day.',message);
});
```
```javascript
bot.hears(['are you human', 'are you a bot', 'are you AI', 'are you ai'], function(message) {
  bot.say('I\'m human assisted artificial intelligence, and I\'m learning to become a better team member, everyday! Let me know how I can help :)', message);
});
```
###Module Function
Module Function are used to create full conversations with Sparkbot. To start a conversation module, you must first create a start hear function.
```javascript
bot.hears(['input'], function(message) {
  bot.startConversation(message, functionName);
});
```
Same as the Hear function, input can be as many as you want formatted in the same manner. Following this you will create functions for your conversation. Each request and response from Sparkbot will be a seperate function. In the intial bot.hear function created above, change functionName to the name of the first function in the conversation. 
####Creating Function
```javascript
functionName = function(response, convo) { ///functionNmae can be any pretermined Name
  convo.ask("Output Question", function(response, convo) { ///Change Output Question to your question
    convo.say("Response to Question") ///Change Response to your response
    askWhereDeliver(response, convo);
    convo.next();
  });
}
```
Create as many of these functions needed per conversation set.

####Linking Functions
The first link is between bot.hear and the first function as descrbied above. After that, call the next function in the current function. This can be see bellow. 

Example
```javascript
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
``` 
This example is based of Howdy's Bot kit Pizza example from their Bot Kit. 

Under /sparkbot/example there is a template file that you can use to create your own Sparkbot. Code up to line 48 is reqiured but anything after that can be erased as it is an example for the user. 
