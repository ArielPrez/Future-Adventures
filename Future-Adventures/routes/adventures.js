const express = require('express');
const router = express.Router();
const Adventure = require('../models/adventure');

router.get('/new', (req, res, next) => {
    let userId = req.user;
    res.render('adventures/new', {user: userId});
});
router.post('/new', (req, res, next) => {
    let refname = req.user;
    const {name, description, date} = req.body;
    if (name === "" || description === "" || date === "") {
        res.render("adventures/new", {
            user: refname,
            message: "Please fill all inputs"
        });
    }
    const newAdventure = new Adventure({refname,name, description, date});
    newAdventure.save((err) => {
        if (err) 
            res.render('adventures/new', {message: "Something went wrong!"});
        else 
            res.redirect('/adventures/show');
        }
    );
});

// [GET] TO SHOW THE DETAILS OF THE ADVENTURE
router.get('/show', (req, res, next) => {
    let userId = req.user;
    // let log = console.log(); log('hola');
    if (!userId) {
        // console.log(advId + ' <======= this is what it found : advId');
        return res
            .status(404)
            .render('not-found');
    }
    Adventure
        .find({refname: userId._id})
        .then(advs => {
            res.render('adventures/show', {
                user: userId,
                advs
            });
        })
        .catch(next);
});

// [POST] TO DELETE THE ADVENTURE
router.post('/:id/delete', (req, res, next) => {
    let advId = req.params.id;
    Adventure
        .findByIdAndRemove(advId)
        .then((adv) => {
            if (!adv) 
                return res
                    .status(404)
                    .render('not-found');
            console.log('===> Successful Deletion. <===');
            res.redirect('/adventures');
        })
        .catch(next);
});

// [GET] TO EDIT THE ADVENTURE
router.get('/:id/edit', (req, res, next) => {
    let advId = req.params.id;
    if (!advId) 
        return res
            .status(404)
            .render('not-found');
    Adventure
        .findById(advId)
        .then(adv => {
            if (!adv) 
                return res
                    .status(404)
                    .render('not-found');
            res.render('adventures/edit', {adv});
        })
        .catch((err) => {
            console.log(err);
        });
});

// [POST] TO EDIT THE USER
router.post('/:id/edit', (req, res, next) => {
    const {name, description, date} = req.body;
    let advId = req.params.id;
    Adventure
        .update({
            _id: advId
        }, {
            $set: {
                name,
                description,
                date
            }
        }, {new: true})
        .then((adv) => {
            console.log(adv.name);
            res.redirect('/adventures');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;