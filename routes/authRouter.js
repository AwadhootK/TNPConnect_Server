const express = require('express')
const { login, refresh, signUp } = require('../controllers/authController.js')

const authRouter = express.Router()

authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/signup', signUp);

module.exports = authRouter;