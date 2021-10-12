const express = require('express');
const router = express.Router();

//import controllers
const guestController = require('../controllers/guestController');
const residentController = require('../controllers/residentController');

//guest information route - resident portal
router.post('/addNewGuest',
  guestController.addNewGuest,
  (req, res) => {
    return res.status(200).json();
});

// current guest list - resident portal
router.get('/getGuests',
  guestController.getGuests,
  (req, res) => {
    return res.status(200).json(res.locals.guestList);
});

// delete guest - resident portal
router.delete('/deleteGuest',
  guestController.deleteGuest,
  (req, res) => {
    return res.status(200).json();
});

// admin resident/guest names list - admin portal
router.get('/',
  residentController.getResidentsAndGuests,
  (req, res) => {
    return res.status(200).json();
});

module.exports = router;
