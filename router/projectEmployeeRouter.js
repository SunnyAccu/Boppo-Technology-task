const express = require('express');
const addProjectEmployee = require('../controller/projectEmployeeController');

const router = express.Router();

router.route('/addProjectEmployee').post(addProjectEmployee);

module.exports = router;
