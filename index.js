//Code written for google assistant
//Tested for Facebook, Google Assistant, slack, skype
//Web demo - does not work when there is rich response, shows [empty response]
'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    //serviceNow = require('./serviceNow'),
    apiai = require('apiai'),
    { Carousel } = require('actions-on-google');

const {WebhookClient} = require('dialogflow-fulfillment');
const {Text, Card, Image, Suggestion, Payload} = require('dialogflow-fulfillment');
	
require('dotenv').config(); //Environment variables	
	
const apiaiApp = apiai(process.env.DIALOGFLOW_ID); //Client Access Token in the dialog flow

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
app.get('/ai', (req, res) => {
    console.log("Inside get method");
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === config.apiaiVerificationToken) {
        res.send(req.query['hub.challenge']);
    } else {
        res.status(403).end();
    }
});

//To handle the response to bot
app.post('/ai', (req, res) => {
    console.log("Inside the API handle " + JSON.stringify(req.body));
    const agent = new WebhookClient({ request: req, response: res });
    let conv = agent.conv();
    function welcome(agent) {
        //Text
        agent.add(new Text({'text': `Welcome to my agent!`, 'ssml': `<speak>Hi<break time='5s'/>Welcome to my agent</speak>` }));
		//Image
		//agent.add(new Image('https://upload.wikimedia.org/wikipedia/commons/a/ad/Celsius_original_thermometer.png'));
		//Basic Card
		/*agent.add(new Card({
			title: 'Vibrating molecules',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Thermally_Agitated_Molecule.gif',
			text: 'Did you know that temperature is really just a measure of how fast molecules are vibrating around?! 😱',
			buttonText: 'Temperature Wikipedia Page', 
			buttonUrl: 'https://en.wikipedia.org/wiki/Temperature'
		  })
        );*/
		//Suggestion chips
		/*agent.add(new Suggestion('27° Celsius'));
		agent.add(new Suggestion('-40° Fahrenheit'));
		agent.add(new Suggestion('Cancel'));*/
        //For carousel
        agent.add(new Payload(
            'FACEBOOK',
            {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "New Device",
                                "image_url": "https://cdn3.iconfinder.com/data/icons/phones-set-2/512/27-512.png",
                                "subtitle": "For requesting new device",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "New Device",
                                        "payload": "new_device"
                                    }
                                ]
                            },
                            {
                                "title": "Damaged Device",
                                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxod-I0fuatggTIxbnHFELF6y62zwXkrzthtoVAWOmOwNQuPJusw",
                                "subtitle": "To report the device is damaged",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "Damaged Device",
                                        "payload": "damaged_device"
                                    }
                                ]
                            },
                            {
                                "title": "Replace Device",
                                "image_url": "https://cdn3.iconfinder.com/data/icons/finance-and-money-1/512/arrows_currency_exchange_direction_flat_icon-512.png",
                                "subtitle": "For replacing the device",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "Replace Device",
                                        "payload": "replace_device"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ));
	}

	function fallback(agent) {
		agent.add(`I didn't understand`);
		agent.add(`I'm sorry, can you try again?`);
    }

	let intentMap = new Map();
	intentMap.set('Default Welcome Intent', welcome);
	intentMap.set('Default Fallback Intent', fallback);
	agent.handleRequest(intentMap);	
	//console.log(req.body.originalRequest.source || req.body.originalDetectIntentRequest.source);
});