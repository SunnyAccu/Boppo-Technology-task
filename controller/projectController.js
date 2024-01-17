const Project = require('../models/projectModel');

const addProject = async (req, res) => {
  try {
    const { name, department } = req.body;
    const project = await Project.create({ name, department });
    res.status(201).json({ message: 'Project added successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = addProject;
