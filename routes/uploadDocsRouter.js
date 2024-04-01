const express = require('express');
const multer = require('multer');

const { uploadDocsPost } = require('../controllers/uploadDocsController.js');

const docRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

docRouter.post("/:erno", upload.single("filename"), uploadDocsPost);
docRouter.post('/edit/:erno', )

module.exports = docRouter;