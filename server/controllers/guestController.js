require('dotenv').config();
const db = require('../models/dbConnection');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const defaultEmail = 'gatepasskey@gmail.com';
const secret = process.env.APPPWD;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${defaultEmail}`,
    pass: `${secret}`
  }
});

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
  // creates assets/images/ folder if it doesnt exist already
  let dir = path.resolve(__dirname, `../../assets/images/`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  try {
    const qNewGuest = {
      text: 'INSERT INTO guests VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [id, guestFirstName, guestLastName, guestEmail, guestPhone, guestLicense, currentUser]
    }
    const qNewGuestResult = await db.query(qNewGuest);
    res.locals.id = id;
  } catch (err) {
    console.log('ERROR IN addNewGuest: ', err);
    return next(err);
  }

  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`, {
    headers: { 'Content-Type': 'image/png' }
  })
    .then(res => {
      const writeStream = fs.createWriteStream(`assets/images/${id}.png`);
      res.body.pipe(writeStream);
      writeStream.on("finish", () => {
        writeStream.close();
        console.log('Downloaded Image');
        return next();
      })
    })
    .catch((err) => {
      console.log('ERROR IN addNewGuest: ', err);
      return next(err);
    });
};

guestController.sendEmail = async (req, res, next) => {
  try {
    const id = res.locals.id;
    const qGuestCheck = {
      text: 'SELECT * FROM guests WHERE _id=$1',
      values: [id]
    }
    const qGuestCheckResult = await db.query(qGuestCheck);

    const user = qGuestCheckResult.rows[0];

    // creates assets/images/ folder if it doesnt exist already
    let dir = path.resolve(__dirname, `../../assets/images/`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const mailOptions = {
      from: `${defaultEmail}`,
      to: `${user.email}`,
      subject: 'GATEPASS: Community visit - QR Code',
      text: 'Attached is your QR Code for your visit. Please call the help desk if there are any issues. Looking forward to having you visit soon!',
      html: '<img src="cid:qr"/>',
      attachments: [{
        filename: `${id}.png`,
        path: path.resolve(__dirname, `../../assets/images/${id}.png`),
        cid: 'qr'
      }],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return next();
  } catch (err) {
    console.log('ERROR IN addNewGuest: ', err)
    return next(err);
  }
}

guestController.getGuests = (req, res, next) => {
  // query database to fetch all active guests for resident
  // return next
  // else, return back to the frontend that there was an error fetching the list of active guests
  const currentUser = req.cookies.user;
  const qAllGuests = 'SELECT * FROM guests WHERE resident_id=$1;'
  db.query(qAllGuests, [currentUser])
    .then(qGuestResult => {
      res.locals.guestList = qGuestResult.rows;
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
  const { guestId } = req.body;
  try {
    const qDeleteGuest = {
      text: 'DELETE FROM guests WHERE _id=$1',
      values: [guestId]
    }
    const qDeleteResult = await db.query(qDeleteGuest);
    return next();
  } catch (err) {
    console.log('ERROR IN deleteGuest: ', err);
    return next(err);
  }
};

module.exports = guestController;
