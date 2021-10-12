const db = require('../models/model');
const loginController = {};

// route to check if the user exists 
loginController.verifyUser = (req, res, next) => {
  // query database to check if the user exists
    // also query for what the user type is (admin or resident) and save the type in res.locals.userType
    // return next
  // else, return back to the frontend that there was an error finding that user
};

// route to generate cookie for the logged in user
loginController.generateCookie = (req, res, next) => {
  // set cookie key: key value: hash identifying user
  // return next
};

// route to generate session for the logged in user
loginController.generateSession = (req, res, next) => {
  // check if res.locals has access, then create session with cookie id and res.locals id
  // return next
};

// route to verify if the user is currently logged into a page
loginController.isLoggedIn = (req, res, next) => {
  // verifies the user's cookie currently has a session for it
  // return next
}

// route that handles the changing of a users password
loginController.changePassword = (req, res, next) => {
  // receive the user's login info in the previous middleware (verifyUser) and update the password
  // return next
}

module.exports = loginController;
