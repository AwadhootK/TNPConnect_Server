const express = require('express')
const { getProfile, postProfile, editProfileDocs, editProfileIsInterned, getResumeLink, getRegisteredCompanies } = require('../controllers/profileController.js')
const { authenticateToken } = require('../validate-jwt.js')

const profileRouter = express.Router()


//! add the auth middlewares back again
profileRouter.get('/:erno', getProfile);
profileRouter.post('/', postProfile);
profileRouter.patch('/:erno', authenticateToken, editProfileDocs);
profileRouter.patch('/isInterned/:erno', authenticateToken, editProfileIsInterned);
profileRouter.get('/resume/:erno', getResumeLink);
profileRouter.get('/registeredCompanies/:studentID', getRegisteredCompanies);

module.exports = profileRouter;