const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/',/* <-- estos son los params*/ (req, res, next) => {
    let user = req.user; 
    res.render('index', {user});

});

module.exports = router;
