const db = require('../models/dbConnection');
const residentController = {};

// route for fetching and sending all information regarding all residents and their guests to the frontend
residentController.getResidentsAndGuests = async (req, res, next) => {
  try {
    const qResidentsAndGuests = {
      text: 'SELECT users.username, users.address, guests._id, guests.first_name, guests.last_name, guests.email, guests.phone_number, guests.license_number, guests.resident_id FROM users LEFT OUTER JOIN guests ON users._id=guests.resident_id WHERE users.admin=false'
    }
    const qResidentsAndGuestsResults = await db.query(qResidentsAndGuests);
    res.locals.residentsAndGuests = qResidentsAndGuestsResults.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = residentController;