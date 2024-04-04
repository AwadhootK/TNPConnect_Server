const express = require('express')
const { login, refresh, signUp, updateDeviceID } = require('../controllers/authController.js')

const authRouter = express.Router()

authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/signup', signUp);
authRouter.post('/deviceID/:studentID', updateDeviceID);

module.exports = authRouter;