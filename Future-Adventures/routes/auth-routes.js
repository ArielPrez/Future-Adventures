const express = require("express");
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

// User model
const User          = require('../models/user');

// // Bcrypt to encrypt passwords
const bcrypt        = require('bcrypt');
const bcryptSalt    = 10;

//ROUTES
router.get("/signup", (req, res, next) => {
  res.render("users/signup");
});

router.post("/signup", (req,res,next) => {
  // const name = req.body.name;
  // const lastname = req.body.lastname;
  // const username = req.body.username;
  // const password = req.body.password;

  const {username, password, name, lastname} = req.body;
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
      password: hashPass,
      name,
      lastname
    });
    newUser.save((err) => {
      if(err) res.render('users/signup', {message: `Something went wrong ${err}`});
      else{
        res.redirect('/');
      }
    });
    
  })
  .catch(err => {next(err);});
});

router.get('/login', (req,res,next) => {
  res.render('users/login', {'message': req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', (req,res) => {
  req.logout();
  req.session.destroy((err) => {
    if(err){
      next(err);
      return;
    }
  });
  res.redirect('/login');
});

module.exports = router;