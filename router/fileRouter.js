const express = require('express');
const fileController = require('../controller/fileController');

const router = express.Router();
const upload = fileController.upload;

router.post('/upload', upload.array('files', 5), fileController.uploadFiles);

module.exports = router;
