const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/',/* <-- estos son tus params*/ (req, res, next) => {
    let user = req.user; 
    res.render('index', {user});
    
// cuando haces una ruta /user/:id ahi puedes usar params, para el resto de las veces aparams no te sirve
   //uso req.user porque eso literalmente va a la informacion del request que se hace cuando abre la pagina 
//el request es un objeto enorme con un monton de informacion y cuando hay un usuario logged in,
// literalmente el objeto tiene una propiedad que se llama "user" con la informacion de ese usuario que esta logged in,
// si no hay nadie logged in, esa propiedad no existe   
//por eso uso req.user, porque me ahorra el trabajo de hacer un link con el id del usuario para cada view y 
//no tengo que estar pasando el id en el url todo el tiempo para poder usar params

});

module.exports = router;
