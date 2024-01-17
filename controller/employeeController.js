const Employee = require('../models/employeeModel');
const ProjectEmployee = require('../models/projectEmployeeModel');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

const addEmployee = async (req, res) => {
  try {
    const { name, position, department } = req.body;
    const employee = await Employee.create({ name, position, department });
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department').exec();

    const employeesWithProjects = await Promise.all(
      employees.map(async (employee) => {
        const projects = await ProjectEmployee.find({ employee: employee._id })
          .populate('project')
          .exec();

        return {
          _id: employee._id,
          name: employee.name,
          position: employee.position,
          department: employee.department,
          projects: projects,
        };
      })
    );

    res.json({ employees: employeesWithProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const employeesInDepartment = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    if (!isValidObjectId(departmentId)) {
      return res.status(400).json({ error: 'Invalid departmentId' });
    }

    const employeesInDepartment = await Employee.find({
      department: departmentId,
    });

    res.json({ employees: employeesInDepartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const employeesOnProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Validate projectId
    if (!isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid projectId' });
    }

    const employeesOnProject = await ProjectEmployee.find({
      project: projectId,
    })
      .populate('employee')
      .exec();

    res.json({ employees: employeesOnProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const employeesInPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const employeesInPeriod = await ProjectEmployee.find({
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) },
    })
      .populate('employee')
      .exec();

    res.json({ employees: employeesInPeriod });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const overallEmployeesOnProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Validate projectId
    if (!isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid projectId' });
    }

    const overallEmployeesOnProject = await ProjectEmployee.find({
      project: projectId,
    })
      .populate('employee')
      .exec();

    res.json({ employees: overallEmployeesOnProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    // Validate employeeId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ error: 'Invalid employeeId' });
    }

    // Soft delete by setting the 'deleted' flag to true
    const result = await Employee.findByIdAndUpdate(
      employeeId,
      { deleted: true },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee soft deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addEmployee,
  getAllEmployee,
  employeesInDepartment,
  employeesOnProject,
  employeesInPeriod,
  overallEmployeesOnProject,
  deleteEmployee,
};
