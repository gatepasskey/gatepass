<<<<<<< HEAD
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
=======
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
app.use(express.static(path.join(__dirname, '../client')))
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
>>>>>>> e9dcd2d6a3ca085a780e32940227bd97a53258d9
