// imports
require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

// router imports
const loginRouter = require('./routers/login.js');
const portalRouter = require('./routers/portal.js');

// instantiate server
const app = express();
const PORT = 3000;

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routers

// router for login
app.use('/login', loginRouter);
// rotuer for portal pages
app.use('/portal', portalRouter);

// error handlers
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).send('Server error');
});

// listener for server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
