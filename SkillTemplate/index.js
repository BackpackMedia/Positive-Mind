'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Positive Re-enforcement';

/**
 * Array containing space facts.
 */
var FACTS = [
    "Your awesome!",
    "Your a boss!",
    "Who da best? You the best!",
    "Today is another day people will experience your awesome",
    "You dope man!",
    "Never forget that your great!",
    "I see you being cute and stuff",
    "Who you looking good for? Oh yea that's right, your just that fly",
    "What has two thumbs and is doing great? You do!",
    "Go out there and save the world",
    "When people say they believe in super heros they are talking about you."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewStatementIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random quote from the list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say hype me up, or, you can say exit... What can I help you with boss?";
        var reprompt = "How can I help boss?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Ok nevermind.');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye boss!');
    }
};
