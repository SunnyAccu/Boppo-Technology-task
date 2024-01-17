const ProjectEmployee = require('../models/projectEmployeeModel');

const addProjectEmployee = async (req, res) => {
  try {
    const { project, employee, startDate, endDate } = req.body;
    const projectEmployee = await ProjectEmployee.create({
      project,
      employee,
      startDate,
      endDate,
    });
    res.status(201).json({
      message: 'Project employee tracking added successfully',
      projectEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = addProjectEmployee;
