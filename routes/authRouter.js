const express = require('express')
const { login, refresh, signUp } = require('../controllers/authController.js')

const authRouter = express.Router()

authRouter.get('/login', login);
authRouter.get('/refresh', refresh);
authRouter.post('/signup', signUp);

module.exports = authRouter;