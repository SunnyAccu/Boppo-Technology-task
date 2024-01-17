const express = require('express');
const addProject = require('../controller/projectController');

const router = express.Router();

router.route('/addProject').post(addProject);

module.exports = router;
