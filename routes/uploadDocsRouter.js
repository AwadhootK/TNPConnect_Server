const express = require('express');

const { uploadDocsPost } = require('../controllers/uploadDocsController.js');

const docRouter = express.Router();

docRouter.post("/:erno/:index", uploadDocsPost);
// docRouter.post('/edit/:erno', )

module.exports = docRouter;