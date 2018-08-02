const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt        = require('bcrypt');
const bcryptSalt    = 10;
const passport = require('passport');

// [GET] TO SHOW THE DETAILS OF THE USER [PROFILE]
router.get('/profile', (req, res, next) => {
    let userId = req.user._id;
    if (!userId) {
        // console.log(
        //     userId + ' <======= this is what it found : userId'
        // );
        return res
            .status(404)
            .render('not-found');
    }
    User
        .findById(userId)
        .then(user => {
            if (!user) {
                // console.log(
                //     user + ' <======= this is what it found : user'
                // );
                return res
                    .status(404)
                    .render('not-found');
            }
            // console.log(user.name + ' <===== User');
            res.render('users/profile', {user}); 
        })
        .catch(next);
}); 


// [POST] TO DELETE THE USER
router.post('/delete', (req, res, next) => {
    let userId = req.user._id;
    User
        .findByIdAndRemove(userId)
        .then((user) => {
            if (!user) 
                return res
                    .status(404)
                    .render('not-found');
            console.log('===> Successful Deletion. <===');
            res.redirect('/');
        })
        .catch(next);
});

// [GET] TO EDIT THE USER
router.get('/edit', (req, res, next) => {
    let userId = req.user._id; 
    // console.log(userId);
    if (!userId) 
        return res
            .status(404)
            .render('not-found'); 
    User.findById(userId)
        .then(user => {
            if (!user) 
                return res
                    .status(404)
                    .render('not-found');
            res.render('users/edit', {user});
        })
        .catch((err) => {
            console.log(err);
        });
});

// [POST] TO EDIT THE USER
router.post('/edit', (req, res, next) => {
    //toma el valor de todos los inputs
    const {name, lastname, username, password} = req.body;
    //aca consigues el id del usuario actual
    let userId = req.user._id;


    if (username === "" || password === "" || name === "" || lastname === "") {
        res.render("users/edit", { message: "Please fill all inputs", user:req.user});
        return;
      }


    //esto es necesario para actualizar el password y se encripte el nuevo
    const salt = bcrypt.genSaltSync(bcryptSalt);
    //aca metes en la variable hashPassh el password encriptado con el metodo de bcrypt
    const hashPass = bcrypt.hashSync(password, salt);


    //busca en la base de datos, en la coleccion "User" un usuario por el id de => req.user._id
    User.update({
            _id: userId
        }, {// set cambia los valores actuales del usuario en la base de datos a los nuevos que pasas 
            $set: {
                name,
                lastname,
                username, 
                // esto se hace asi para que se siga llamando password en la base de datos, pero realmente la informacion esta dentro de la variable hashPass que esta arriba
                password:hashPass
            }
        }, {new: true})
        .then(() => {
            res.redirect('/users/profile');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;