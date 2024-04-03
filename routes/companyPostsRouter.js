const express = require('express')
const { authenticateToken } = require('../validate-jwt.js');
const { getCompanyPostingData } = require('../controllers/companyPostsController.js');
const companyPostRouter = express.Router()

//! add authenticateToken middleware
companyPostRouter.get('/', getCompanyPostingData);

module.exports = companyPostRouter;