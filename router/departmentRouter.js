const express = require('express');
const addDepartment = require('../controller/departmentController');

const router = express.Router();

router.route('/addDepartment').post(addDepartment);

module.exports = router;
