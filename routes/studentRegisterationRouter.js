const express = require('express');
const { authenticateToken } = require('../validate-jwt');
const { studentRegPost } = require('../controllers/studentRegisterationController.js');

const studentRegRouter = express.Router();

//! add authToken middleware
studentRegRouter.post('/', studentRegPost);

module.exports = studentRegRouter;