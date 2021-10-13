const db = require('../models/dbConnection');
const residentController = {};

// route for fetching and sending all information regarding all residents and their guests to the frontend
residentController.getResidentsAndGuests = async (req, res, next) => {
  try {
    // const qResidentsAndGuests = {
    //   text: 'SELECT users.username, users.address, guests._id, guests.first_name, guests.last_name, guests.email, guests.phone_number, guests.license_number, guests.resident_id FROM users LEFT OUTER JOIN guests ON users._id=guests.resident_id WHERE users.admin=false'
    // }
    // const qResidentsAndGuestsResults = await db.query(qResidentsAndGuests);
    const { residentAddress } = req.body;
    const qResidentInfo = {
      text: 'SELECT * FROM users WHERE address=$1',
      values: [residentAddress]
    }
    const qResidentInfoResults = await db.query(qResidentInfo);
    res.locals.residentInfo = qResidentInfoResults.rows[0];
    // console.log('this is the resident info: ', res.locals.residentInfo);
    const qGetGuests = {
      text: 'SELECT * FROM guests WHERE resident_id=$1',
      values: [res.locals.residentInfo._id]
    }
    const qGetGuestsResults = await db.query(qGetGuests);
    res.locals.guests = qGetGuestsResults.rows;
    // console.log('this is the guest info: ', res.locals.guests);
    return next();
  } catch (err) {
    console.log('ERROR in getResidentsAndGuests: ', err)
    return next(err);
  }
}

module.exports = residentController;