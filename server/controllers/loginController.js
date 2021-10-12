const db = require('../models/dbConnection');
const { v4: uuidv4 } = require('uuid');
const loginController = {};

// route to check if the user exists 
loginController.verifyUser = async (req, res, next) => {
  // query database to check if the user exists
    // also query for what the user type is (admin or resident) and save the type in res.locals.userType
    // return next
  // else, return back to the frontend that there was an error finding that user\
  const { username, password } = req.body;
  try {
    const qUser = {
      text: 'SELECT * FROM users WHERE username=$1 AND password=$2',
      values: [username, password]
    }
    const qResult = await db.query(qUser);
    if (qResult.rows.length) {
      if (qResult.rows.admin) {
        res.locals.userType = 'admin';
      } else {
        res.locals.userType = 'resident';
      }
      res.locals.user = qResult.rows[0].username;
      return next();
    }
    return res.json({ message: 'User Not Found' });
  } catch (err) {
    return next(err);
  }
};
// cookie will have userId
// returned value from 
// 
// route to generate cookie for the logged in user
loginController.generateCookie = (req, res, next) => {
  // set cookie key: key value: hash identifying user
  // return next
  if (res.locals.user && res.locals.userType === 'admin') {
    res.cookie('access', 'admin');
  } else {
    res.cookie('access', 'resident');
  } 
  res.cookie('username', res.locals.user);
  return next();
};

// route to verify if the user is currently logged into a page
loginController.isLoggedIn = (req, res, next) => {
  // verifies the user's cookie currently has a session for it
  // return next
  if (req.cookies.access === 'admin') {
    res.locals.hasAdminAccess = true;
  } else if (req.cookies.access === 'resident') {
    res.locals.hasAdminAccess = false;
  } else {
    return res.json({ message: 'Invalid Access' });
  }
  return next();
}

// route that handles the changing of a users password
loginController.changePassword = async (req, res, next) => {
  // receive the user's login info in the previous middleware (verifyUser)
  // change the password of the user that was found earlier in the middleware chain
  // return next
  const { newPassword } = req.body;
  try {
    const qPassword = {
      text: 'UPDATE users SET password=$1 WHERE username=$2',
      values: [newPassword, res.locals.user]
    }
    const qPassResult = await db.query(qPassword);
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = loginController;
