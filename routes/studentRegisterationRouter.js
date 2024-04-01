const express = require('express');
const { authenticateToken } = require('../validate-jwt');
const { studentRegPost } = require('../controllers/studentRegisterationController.js');

const studentRegRouter = express.Router();

studentRegRouter.post('/response', authenticateToken, studentRegPost);

module.exports = studentRegRouter;