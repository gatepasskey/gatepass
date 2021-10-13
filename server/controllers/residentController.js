const db = require('../models/dbConnection');
const residentController = {};

// route for fetching and sending all information regarding all residents and their guests to the frontend
residentController.getResidentsAndGuests = async (req, res, next) => {
  try {
    const { residentAddress } = req.body;
    const qResidentInfo = {
      text: 'SELECT * FROM users WHERE address=$1',
      values: [residentAddress]
    }
    const qResidentInfoResults = await db.query(qResidentInfo);
    res.locals.residentInfo = qResidentInfoResults.rows[0];
    const qGetGuests = {
      text: 'SELECT * FROM guests WHERE resident_id=$1',
      values: [res.locals.residentInfo._id]
    }
    const qGetGuestsResults = await db.query(qGetGuests);
    res.locals.guests = qGetGuestsResults.rows;
    return next();
  } catch (err) {
    console.log('ERROR in getResidentsAndGuests: ', err)
    return next(err);
  }
}

module.exports = residentController;