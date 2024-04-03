const express = require('express')
const { authenticateToken } = require('../validate-jwt.js');
const { getCompanyPostingData } = require('../controllers/companyPostsController.js');
const companyPostRouter = express.Router()

companyPostRouter.get('/', authenticateToken , getCompanyPostingData);

module.exports = companyPostRouter;