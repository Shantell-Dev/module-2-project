const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { Router } = require("express");
const router = new Router();

router.post('/signup', async (req, res, next) => {

  try {

    const {username, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({message: 'User with this email already exists'});

    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save();
    res.redirect('/UserProfile');

  } catch (error) {
    next(error);
  }
});


// GET /auth/login
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  //const { email, password } = req.body;
 
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
  User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("Email not registered. ");
        res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
        return;
      } 
    else if (bcryptjs.compareSync(password, user.passwordHash)) {
      req.session.currentUser = user;
      res.redirect('/userProfile');
    } else {
      console.log("Incorrect password. ");
      res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
    }
  })
  .catch(error => next(error));
});
// GET /auth/logout
router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});
//const { isLoggedOut } = require('../middleware/route-guard.js');
router.get('/userProfile', isLoggedIn, (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});

module.exports = router;
