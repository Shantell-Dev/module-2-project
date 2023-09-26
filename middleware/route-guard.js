// middleware/route-guard.js
const express = require('express');
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

// Define route handlers
router.get('/userProfile', isLoggedIn, (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});

router.get('/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup');
});

module.exports = router;
