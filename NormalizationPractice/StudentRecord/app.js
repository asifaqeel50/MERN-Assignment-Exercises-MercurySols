const express = require('express');
const mongoose = require('mongoose');
const studentsRouter = require('./routes/students');
const advisorsRouter = require('./routes/advisors');
const coursesRouter = require('./routes/courses');
const enrollmentsRouter = require('./routes/enrollments');
const majorsRouter = require('./routes/majors');

const app = express();

mongoose.connect('mongodb://localhost/student_records', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/students', studentsRouter);
app.use('/api/advisors', advisorsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/enrollments', enrollmentsRouter);
app.use('/api/majors', majorsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));