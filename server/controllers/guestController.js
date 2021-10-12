const db = require('../models/dbConnection');
const { v4: uuidv4 } = require('uuid');

const guestController = {};

// route to add new guest
guestController.addNewGuest = async (req, res, next) => {
  // check if guest (based on name/drivers license or some unique id) is already checked in to avoid duplicates
  // add guest data to database if completely new
  // return next
  // else, return back to the frontend that there was an error adding a new guest
  const { guestFirstName, guestLastName, guestEmail, guestPhone, guestLicense, guestResidentId } = req.body;
  try {
    const qNewGuest = {
      text: 'INSERT INTO guests VALUES ()',
      values: [guestFirstName, guestLastName, guestEmail, guestPhone, guestLicense, guestResidentId]
    }
    const qResult = await db.query(qNewGuest);
  } catch (err) {
    return next(err);
  }
};

// route to fetch all active guests
guestController.getGuests = async (req, res, next) => {
  // const id = uuidv4();
  // query database to fetch all active guests for resident
  // return next
  // else, return back to the frontend that there was an error fetching the list of active guests
  const currentUser = req.cookies.user;
  try {
    const qAllGuests = {
      text: 'SELECT * FROM guests WHERE resident_id=$1',
      value: [currentUser]
    }
    const qGuestResult = await db.query(qAllGuests);
    res.locals.guestList = qGuestResult.rows;
    return next();
  } catch(err) {
    return next(err);
  }
};

// route to delete existing guest
guestController.deleteGuest = async (req, res, next) => {
  // delete guest from database
  // return next
  // else, return back to the frontend that there was an error deleting a guest
  const currentUser = req.cookies.user;
  const { guestId } = req.body;
  try {
    const deleteGuest = {
      text: 'DELETE FROM guests WHERE resident_id=$1 AND _id=$2',
      value: [currentUser, guestId]
    }
    
  } catch(err) {
    return next(err);
  }
};

module.exports = guestController;
