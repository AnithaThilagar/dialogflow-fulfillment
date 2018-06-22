'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    //serviceNow = require('./serviceNow'),
	apiai = require('apiai'),
	DialogflowApp = require('actions-on-google').DialogflowApp;

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
    logger.info('Inside Bot request ',req.body);
    /*let source = '';
    if (typeof req.body.originalRequest != "undefined") {
        logger.info("Platform - "+req.body.originalRequest.source);
        console.log(req.body.originalRequest.source);
        source = req.body.originalRequest.source;
    } else {
        logger.info('Platform - No info');
        console.log('Req from other sources');
        source = 'facebook';//By default send the facebook response
    }
    handleRequest(req, res, source);*/
});