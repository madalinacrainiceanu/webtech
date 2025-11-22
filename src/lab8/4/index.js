"use strict";

const express = require('express');
const app = express();

// Import routerul status
const statusRouter = require('./routes/status.js');
const departmentsRouter = require('./routes/departments.js');


app.use('/status', statusRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
