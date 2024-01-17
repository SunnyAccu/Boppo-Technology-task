const express = require('express');
const app = express();
const morgan = require('morgan');

// routes importing
const employee = require('./router/employeeRouter');
const department = require('./router/departmentRouter');
const project = require('./router/projectRouter');
const projectEmployee = require('./router/projectEmployeeRouter');
const file = require('./router/fileRouter');

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/v1/employee', employee);
app.use('/api/v1/department', department);
app.use('/api/v1/project', project);
app.use('/api/v1/projectEmployee', projectEmployee);
app.use('/api/v1/file', file);

module.exports = app;
