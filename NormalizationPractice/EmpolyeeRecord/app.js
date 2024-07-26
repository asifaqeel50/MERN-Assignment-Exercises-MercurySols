const express = require('express');
const mongoose = require('mongoose');
const employeesRouter = require('./routes/employees');
const departmentsRouter = require('./routes/departments');
const positionsRouter = require('./routes/positions');
const employmentHistoriesRouter = require('./routes/employmentHistories');

const app = express();

mongoose.connect('mongodb://localhost/employee_management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/employees', employeesRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/positions', positionsRouter);
app.use('/api/employment-histories', employmentHistoriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));