const express = require("express");
const db = require("../config/db");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = require("../config/key");
const RegisterContoller = require("../controllers/UserController");


// Authorization Routes
Router.post('/register', RegisterContoller.RegisterContoller);
Router.post('/login', RegisterContoller.LoginController);
Router.post('/signout', RegisterContoller.SignoutController);



module.exports = Router
