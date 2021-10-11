const express = require('express');
const router = express.Router();

//import controllers
const guestController = require('../controllers/guestController');
const residentController = require('../controllers/residentController');

//guest information route - resident portal
router.post('/',
  guestController.addNewGuest,
  (req, res) => {
    return res.status(200).json();
});

// current guest list - resident portal
router.get('/',
  guestController.getGuests,
  (req, res) => {
    return res.status(200).json();
});

// delete guest - resident portal
router.delete('/',
  guestController.deleteGuest,
  (req, res) => {
    return res.status(200).json();
});

// admin resident/guest names list - admin portal
router.get('/',

  (req, res) => {
    return res.status(200).json();
});

module.exports = router;
