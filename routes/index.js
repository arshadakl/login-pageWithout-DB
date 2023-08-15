var express = require('express');
var router = express.Router();
var users = require("../helpers/user-helper");
const { response } = require('../app');
const { route } = require('./home');


router.get('/login', function(req, res, next) {
  user = req.session.user
  user ? res.redirect("/") : res.render('index', { title: 'Login' ,"loginErr":req.session.loginErr})
  req.session.loginErr=false
});




router.post('/login', (req,res,Next)=>{
  const {email,pass} = req.body
  let user = false
  user = users.find(users => users.email === email && users.password === pass);

  if(user){
    req.session.loggedIn = true
    currentDate = new Date()
    req.session.lastLogDate= currentDate.toLocaleString();
    console.log(req.session.lastLogDate);
    req.session.user = user
    console.log(user);
    res.redirect("/")
  }else{
    req.session.loginErr=true
    console.log("login Failed..");
    res.redirect("/login")
    
  }

})

router.get("/logout",(req,res)=>{
  req.session.user = null
  res.redirect("/login")
})

module.exports = router;
