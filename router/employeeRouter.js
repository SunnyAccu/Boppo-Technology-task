const express = require('express');
const {
  addEmployee,
  getAllEmployee,
  employeesInDepartment,
  employeesOnProject,
  employeesInPeriod,
  overallEmployeesOnProject,
  deleteEmployee,
} = require('../controller/employeeController.js');
const router = express.Router();

router.route('/addemployee').post(addEmployee);
router.route('/getAllEmployee').get(getAllEmployee);
router.route('/employeesInDepartment/:departmentId').get(employeesInDepartment);
router.route('/employeesOnProject/:projectId').get(employeesOnProject);
router.route('/employeesInPeriod').get(employeesInPeriod);
router
  .route('/overallEmployeesOnProject/:projectId')
  .get(overallEmployeesOnProject);
router.route('/deleteEmployee/:employeeId').delete(deleteEmployee);

module.exports = router;
