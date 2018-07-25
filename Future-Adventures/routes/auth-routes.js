const express = require("express");
const authRoutes = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

// User model
const User          = require('../models/user');

// // Bcrypt to encrypt passwords
const bcrypt        = require('bcrypt');
const bcryptSalt    = 10;

//ROUTES
authRoutes.get("/signup", (req, res, next) => {
  res.render("users/signup");
});

authRoutes.post("/signup", (req,res,next) => {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username,password, ' <==== ');

  if(username === '' || password === ''){
    res.render('users/signup', {message: 'Write some Username and Password.'});
    return;
  }
  User.findOne({username})
  .then(user => {
    if(user !== null){
      res.render('users/signup', {message: 'The Username already exists.'});
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    // console.log(salt,hashPass, ' <==== ');
    const newUser = new User({
      username,
      password: hashPass
    });
    newUser.save((err) => {
      if(err) res.render('users/signup', {message: `Something went wrong ${err}`})
      else{
        res.redirect('/');
      }
    })
    
  })
  .catch(err => {next(err)})
});

authRoutes.get('/login', (req,res,next) => {
  res.render('users/login', {'message': req.flash('==> error <==')});
});

authRoutes.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

module.exports = authRoutes;