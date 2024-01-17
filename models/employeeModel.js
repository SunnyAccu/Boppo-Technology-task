const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  deleted: { type: Boolean, default: false },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
