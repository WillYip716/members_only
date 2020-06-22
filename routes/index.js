var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Message = require('../models/message');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.find({}.populate('author').sort([[dateadded,1]])).exec(function (err, result) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('index', { title: 'Members Only Messageboard', messages: result });
  });
});





router.get('/sign-up', function(req, res, next) {
  res.render('signup', {});
});

router.post("/sign-up", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    if (err) { 
        return next(err);
    };
    const member = new Member({
        loginname: req.body.username,
        screenname: req.body.screenname,
        password: hashedPassword,
        membership: 'standard'
      }).save(err1 => {
        if (err1) { 
          return next(err1);
        };
        res.redirect("/");
      });
  });  
});

module.exports = router;
