const express = require('express')
const { getProfile, postProfile } = require('../controllers/profileController.js')
const { authenticateToken } = require('../validate-jwt.js')

const profileRouter = express.Router()

profileRouter.get('/:erno', authenticateToken, getProfile);
profileRouter.post('/', authenticateToken, postProfile)

module.exports = profileRouter;