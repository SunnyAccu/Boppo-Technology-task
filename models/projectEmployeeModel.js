const mongoose = require('mongoose');

const projectEmployeeSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

const ProjectEmployee = mongoose.model(
  'ProjectEmployee',
  projectEmployeeSchema
);

module.exports = ProjectEmployee;
