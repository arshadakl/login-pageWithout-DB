var express = require("express");
var router = express.Router();
// var users = require("../helpers/user-helper");
var userHelpers = require("../helpers/user-helper");

const verifyLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// login
router.get("/login", function (req, res, next) {
  user = req.session.user;
  user
    ? res.redirect("/")
    : res.render("index", {
        title: "Login",
        user,
        auth: true,
        loginErr: req.session.loginErr
      });   
  req.session.loginErr = false;
});

//login post
router.post("/login", (req, res, Next) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      console.log(response.user);
      req.session.loggedIn = true;
      currentDate = new Date();
      req.session.lastLogDate = currentDate.toLocaleString();
      console.log(req.session.lastLogDate);
      req.session.user = response.user;
      res.redirect("/");
    } else {
      req.session.loginErr = true;
      res.redirect("/login");
    }
  });

});

// logOut
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

//signUp

router.get("/signup", async (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("signup", { auth: true, signErr: req.session.signErr });
    req.session.signErr = false;
  }
});
//sign post

router.post("/signup", async (req, res) => {
  userHelpers.userExist(req.body.email).then((status) => {
    console.log(status);
    if (status.email) {
      req.session.signErr = true;
      res.redirect("/signup");
    } else {
      //signup true prosess here..
      userHelpers.doSignup(req.body).then((response) => {
        console.log(response);
        req.session.loggedIn = true;
        req.session.signUpAlert=true
        currentDate = new Date();
        req.session.lastLogDate = currentDate.toLocaleString();
        req.session.user = response.user;
        console.log(response.user);
        res.redirect("/");
      });
    }
   
  });
 
});

///profile

router.get("/profile", verifyLogin, (req, res, next) => {
  user = req.session.user;
  date = req.session.lastLogDate;
  res.render("profile", { user, title: "Profile", date });
});


//home page router

router.get("/", verifyLogin,async(req, res, next) => {
  user = req.session.user;
  userHelpers.getProducts().then(async(products)=>{
    banner = await userHelpers.getBanner()
    res.render("home", { title: "Home", products, user, banner,
    signUpAlert:req.session.signUpAlert });
    req.session.signUpAlert= false 
  })
});
  


module.exports = router;
