const express = require("express");
const userRoute = express();
const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
// userRoute.use(express.static('public'));


const user_controller = require("../controller/userController");

userRoute.post('/registerUser', user_controller.registerUser);
userRoute.post('/loginUser', user_controller.loginUser);

userRoute.get('/getUsers/:id', user_controller.getUsers);
userRoute.get('/getUser', user_controller.getUser);

module.exports = userRoute;


