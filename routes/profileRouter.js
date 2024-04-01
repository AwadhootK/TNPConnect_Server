const express = require('express')
const { getProfile, postProfile, editProfileDocs } = require('../controllers/profileController.js')
const { authenticateToken } = require('../validate-jwt.js')

const profileRouter = express.Router()

profileRouter.get('/:erno', getProfile);
profileRouter.post('/', postProfile);
profileRouter.patch('/:erno', editProfileDocs);

module.exports = profileRouter;