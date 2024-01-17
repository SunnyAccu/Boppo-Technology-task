const Department = require('../models/departmentModel');

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({ name });
    res
      .status(201)
      .json({ message: 'Department added successfully', department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = addDepartment;
