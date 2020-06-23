var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Message = require('../models/message');
const validator = require("express-validator");
const { check, validationResult } = require("express-validator");
var async = require('async');
var bcrypt = require('bcryptjs');
const passport = require("passport");
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.find({}).sort([['dateadded',1]]).populate('author').exec(function (err, result) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('index', { title: 'Members Only Messageboard', messages: result, user:req.user});
  });
});


router.get('/sign-up', function(req, res, next) {
  res.render('signup', {});
});

router.post("/sign-up", 
[
  check("username", "Please make a guess").exists().isLength({min:2}).trim().escape(),
  check("screenname", "Please make a guess").exists().isLength({min:2}).trim().escape(),
  check("password", "Please make a guess").exists().isLength({min:2}).trim().escape(),
] ,(req, res, next) => {
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

router.get('/log-in', function(req, res, next) {
  res.render('log-in', {});
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);


router.get('/create-message', function(req, res, next) {
  res.render('create-message', {});
});

router.post("/create-message", 
[
  check("title", "Please make a guess").exists().isLength({min:2}).trim().escape(),
  check("message", "Please make a guess").exists().isLength({min:2}).trim().escape(),
] ,(req, res, next) => {

    const message = new Message({
        title: req.body.title,
        message: req.body.message,
        dateadded: moment().format('MMMM Do YYYY, h:mm:ss a'),
        author: req.user
      }).save(err1 => {
        if (err1) { 
          return next(err1);
        };
        res.redirect("/");
    });
});

router.get('/upgrade', function(req, res, next) {
  res.render('upgrade', {});
});

router.post('/upgrade', function(req,res,next){
  const member = new Member({
    loginname: req.user.loginname,
    screenname: req.user.screenname,
    password: req.user.password,
    membership: 'plus',
    _id:req.user._id
  });
  Member.findByIdAndUpdate(req.user._id,member, {},function (err) {
    if (err) { return next(err); }
       // Successful - redirect to new store.
       res.redirect("/");
  });
});


router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
