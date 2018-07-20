const express = require('express');
const router = express.Router();
const User = require('../models/user');

// [GET] TO SHOW THE DETAILS OF THE USER [PROFILE]
router.get('/:id', (req,res,next) => {
  let userId = req.params.id;
  if(!req.params.id){
    console.log(userId + ' <======= this is what it found : userId');
    return res.status(404).render('not-found');
  }
  User.findById(userId)
  .then(user => {
    if(!user){
      console.log(userId + ' <======= this is what it found : userId');
      return res.status(404).render('not-found');
    }
    console.log(user.name + ' <===== User');
    res.render('users/show', {user});
  })
  .catch(next);
});

// [POST] TO DELETE THE USER
router.post('/:id/delete', (req,res,next) => {
  let userId = req.params.id;
  User.findByIdAndRemove(userId)
  .then((user) => {
    if(!user) return res.status(404).render('not-found');
    console.log('===> Successful Deletion. <===');
    res.redirect('/users');
  })
  .catch(next);
});

// [GET] TO EDIT THE USER
router.get('/:id/edit', (req,res,next) =>{
  let userId = req.params.id;
  if(!userId) return res.status(404).render('not-found');
  User.findById(userId)
  .then(user => {
    if(!user) return res.status(404).render('not-found');
    res.render('users/edit', {user});
  })
  .catch((err) =>{
    console.log(err);
  });
});

// [POST] TO EDIT THE USER
router.post('/:id/edit', (req,res,next) =>{
  const {name,lastname} = req.body;
  let userId = req.params.id;
  User.update({_id: userId},{$set:{name,lastname}},{new: true})
  .then((user) =>{
    console.log(user.name);
    res.redirect('/users');
  })
  .catch((err) =>{
    console.log(err);
  });
});

module.exports = router;