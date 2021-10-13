const express = require('express');
const router = express.Router();

//import controllers
const loginController = require('../controllers/loginController');

//login route
router.post('/',
  loginController.verifyUser,
  loginController.generateCookie,
  (req, res) => {
    return res.status(200).json(res.locals.userType);
});

router.get('/loginCheck',
  loginController.isLoggedIn,
  (req, res) => {
    return res.status(200).json({ message: "user logged in", type: res.locals.userType});
});

router.post('/changedPassword',
  loginController.verifyUser,
  loginController.changePassword,
  (req, res) => {
    return res.status(200).json({ message: "changed password" });
});

module.exports = router;