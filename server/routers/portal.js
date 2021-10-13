const express = require('express');
const router = express.Router();

//import controllers
const guestController = require('../controllers/guestController');
const residentController = require('../controllers/residentController');

//guest information route - resident portal
router.post('/addNewGuest',
  guestController.addNewGuest,
  guestController.sendEmail,
  (req, res) => {
    return res.status(200).json(res.locals.newGuest);
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
    return res.status(200).json({ message: "User deleted" });
});

// admin resident/guest names list - admin portal
router.get('/getResidentsAndGuests',
  residentController.getResidentsAndGuests,
  (req, res) => {
    return res.status(200).json(res.locals.residentsAndGuests);
});

module.exports = router;
