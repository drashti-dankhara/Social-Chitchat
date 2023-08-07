const express = require("express");
const messageRoute = express();
const bodyParser = require("body-parser");
messageRoute.use(bodyParser.json());
messageRoute.use(bodyParser.urlencoded({ extended: true }));


const message_controller = require("../controller/messageController");

messageRoute.post('/addMessage', message_controller.addMessage);
messageRoute.post('/getAllMessage', message_controller.getAllMessage);


module.exports = messageRoute;


