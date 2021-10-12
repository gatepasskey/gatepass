const db = require('../models/model');
const residentController = {};

// route for fetching and sending all information regarding all residents and their guests to the frontend
residentController.getResidentsAndGuests = (req, res, next) => {
  // try {
  //   const fetchAll = 'SELECT ';
  //   db.query(fetchAll).then((data) => {
  //     res.locals = data.rows;
  //     return next();
  //   }).catch (err => {
  //     return console.error(err);
  //   });
  // } catch (err) {
  //   return next({
  //     log: `residentController.getResidentsAndGuests: ERROR: ${err.message}`,
  //     message: {err: 'Error occurred in residentController.getResidentsAndGuests. Check server logs for more details.'},
  //   });
  // }
};

module.exports = residentController;