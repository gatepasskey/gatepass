const db = require('../models/model');
const { v4: uuidv4 } = require('uuid');

const guestController = {};

// route to fetch all active guests
guestController.getGuests = (req, res, next) => {
  // const id = uuidv4();
  // query database to fetch all active guests for resident
  // return next
  // else, return back to the frontend that there was an error fetching the list of active guests
};

// route to add new guest
guestController.addNewGuest = (req, res, next) => {
  // check if guest (based on name/drivers license or some unique id) is already checked in to avoid duplicates
  // add guest data to database if completely new
  // return next
  // else, return back to the frontend that there was an error adding a new guest
};

// route to renew existing guest's pass 
guestController.renewGuest = (req, res, next) => {
  // check if guest is active and add 3 days to the checkout time (maximum of 9 days)
  // return next
  // else, return back to the frontend that there was an error renewing a guest
}

// route to delete existing guest
guestController.deleteGuest = (req, res, next) => {
  // delete guest from database
  // return next
  // else, return back to the frontend that there was an error deleting a guest
};

module.exports = guestController;