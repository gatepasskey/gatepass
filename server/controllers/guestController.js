const db = require('../models/dbConnection');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const fs = require('fs');
const guestController = {};

// route to add new guest
guestController.addNewGuest = async (req, res, next) => {
  // check if guest (based on name/drivers license or some unique id) is already checked in to avoid duplicates
  // add guest data to database if completely new
  // return next
  // else, return back to the frontend that there was an error adding a new guest
  const { guestFirstName, guestLastName, guestEmail, guestPhone, guestLicense } = req.body;
  const currentUser = req.cookies.user;
  const id = uuidv4();
  try {
    fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`, {
      headers: {'Content-Type': 'image/png'}
    })
      .then(res => {
        res.body.pipe(fs.createWriteStream(`assets/images/${id}.png`));
      });
    const qNewGuest = {
      text: 'INSERT INTO guests VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [id, guestFirstName, guestLastName, guestEmail, guestPhone, guestLicense, currentUser]
    }
    const qNewGuestResult = await db.query(qNewGuest);
    res.locals.newGuest = qNewGuestResult.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

// route to fetch all active guests
guestController.getGuests = (req, res, next) => {
  // query database to fetch all active guests for resident
  // return next
  // else, return back to the frontend that there was an error fetching the list of active guests
  const currentUser = req.cookies.user;
  const qAllGuests = 'SELECT * FROM guests WHERE resident_id=$1;'
  // const qAllGuests = {
  //   text: 'SELECT * FROM guests WHERE resident_id=$1;',
  //   value: [currentUser]
  // }
  db.query(qAllGuests, [currentUser])
    .then(qGuestResult => {
      res.locals.guestList = qGuestResult.rows;
      console.log('DATA:', res.locals.guestList);
      return next();
    })
    .catch(err => {
      return next(err)
    });
};

// route to delete existing guest
guestController.deleteGuest = async (req, res, next) => {
  // delete guest from database
  // return next
  // else, return back to the frontend that there was an error deleting a guest
  const currentUser = req.cookies.user;
  const { guestId } = req.body;
  try {
    const qDeleteGuest = {
      text: 'DELETE FROM guests WHERE resident_id=$1 AND _id=$2',
      value: [currentUser, guestId]
    }
    const qDeleteResult = await db.query(qDeleteGuest);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = guestController;
