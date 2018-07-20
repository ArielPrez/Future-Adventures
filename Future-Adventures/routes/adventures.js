const express = require('express');
const router = express.Router();
const Adventure = require('../models/adventure');

// [GET] TO SHOW THE DETAILS OF THE ADVENTURE
router.get('/:id', (req,res,next) => {
  let advId = req.params.id;
  if(!req.params.id){
    console.log(advId + ' <======= this is what it found : advId');
    return res.status(404).render('not-found');
  }
  Adventure.findById(advId)
  .then(adv => {
    if(!adv){
      console.log(advId + ' <======= this is what it found : advId');
      return res.status(404).render('not-found');
    }
    console.log(adv.name + ' <===== Adventure');
    res.render('adventures/show', {adv});
  })
  .catch(next);
});

// [POST] TO DELETE THE ADVENTURE
router.post('/:id/delete', (req,res,next) => {
  let advId = req.params.id;
  Adventure.findByIdAndRemove(advId)
  .then((adv) => {
    if(!adv) return res.status(404).render('not-found');
    console.log('===> Successful Deletion. <===');
    res.redirect('/adventures');
  })
  .catch(next);
});

// [GET] TO EDIT THE ADVENTURE
router.get('/:id/edit', (req,res,next) =>{
  let advId = req.params.id;
  if(!advId) return res.status(404).render('not-found');
  Adventure.findById(advId)
  .then(adv => {
    if(!adv) return res.status(404).render('not-found');
    res.render('adventures/edit', {adv});
  })
  .catch((err) =>{
    console.log(err);
  });
});

// [POST] TO EDIT THE USER
router.post('/:id/edit', (req,res,next) =>{
  const {name,description,date} = req.body;
  let advId = req.params.id;
  Adventure.update({_id: advId},{$set:{name,description,date}},{new: true})
  .then((adv) =>{
    console.log(adv.name);
    res.redirect('/adventures');
  })
  .catch((err) =>{
    console.log(err);
  });
});


module.exports = router;