const db = require('../models/dbConnection');
const residentController = {};

// route for fetching and sending all information regarding all residents and their guests to the frontend
residentController.getResidentsAndGuests = (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

module.exports = residentController;