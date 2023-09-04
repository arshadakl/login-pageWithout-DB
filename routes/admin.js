const express = require("express");
const router = express.Router();
// const {MongoClient} = require("mongodb")
// const client = new MongoClient('mongodb://127.0.0.1:27017')
const adminHelpers = require("../helpers/admin-helpers");
const userHelper = require("../helpers/user-helper");
const adminVerifyLogin = (req, res, next) => {
  if (req.session.adminLoggdIn) {
    next();
  } else {
    res.redirect("/admin");
  }
};
//admin login routers
router.get("/", async (req, res) => {
  admin = await req.session.admin;
  admin
    ? res.redirect("/admin/dashboard")
    : res.render("adminLogin", {
        auth: true,
        admin,
        adminLogErr: req.session.adminLogErr,
      });
  req.session.adminLogErr = false;
});

router.post("/", (req, res) => {
  adminHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.adminLoggdIn = true;
      req.session.admin = response.admin;
      res.redirect("/admin/dashboard");
    } else {
      req.session.adminLogErr = true;
      res.redirect("/admin");
    }
  });
  // console.log(req.body);
});

//admin pannel dashboard

router.get("/dashboard", adminVerifyLogin, async (req, res) => {
  admin = await req.session.admin;
  let users = await adminHelpers.getUsers();
  res.render("dashboard", {
    users,
    admin,
    adminSignErr: req.session.adminSignErr,
    newUserAlert: req.session.newUserAlert,
    deleteUserAlert: req.session.deleteUserAlert,
    editUserAlert:req.session.editUserAlert,
    passUpdateAlert:req.session.passUpdateAlert
  });
  req.session.passUpdateAlert=false
  req.session.deleteUserAlert = false;
  req.session.adminSignErr = false;
  req.session.newUserAlert = false;
  req.session.editUserAlert = false
});

//add users
router.get("/adduser", adminVerifyLogin, (req, res) => {
  res.redirect("/admin");
});
router.post("/adduser", adminVerifyLogin, (req, res) => {
  userHelper.userExist(req.body.email).then((status) => {
    console.log(status);
    if (!status.email) {
      console.log("mission condinu..");
      userHelper.doSignup(req.body).then((response) => {
        req.session.newUserAlert = true;
        console.log(response);
        res.redirect("/admin/dashboard");
      });
    } else {
      console.log("no comdinue........");
      req.session.adminSignErr = true;
      res.redirect("/admin");
    }
  });
  // userHelper.doSignup(req.body).then((response)=>{
  //     console.log(response);
  //     res.redirect('/admin')
  // })
});

//edit users...

router.get("/dashboard/delete/:id", adminVerifyLogin, (req, res) => {
  userId = req.params.id;
  adminHelpers.deleteUser(userId).then((response) => {
    req.session.deleteUserAlert = true;
    res.redirect("/admin");
  });
});

router.get("/dashboard/edit-user/:id", adminVerifyLogin, async (req, res) => {
  admin = await req.session.admin;
  userId = req.params.id;
  adminHelpers.getUser(userId).then((userInfo) => {
    // console.log(userInfo);
    res.render("editUser", { admin, userInfo });
  });
});

//change passwords.....
router.post("/dashboard/change-pass/:id", adminVerifyLogin, (req, res) => {
  (id = req.params), id;
  adminHelpers.changePass(req.body.pass, id).then((response) => {
    console.log(response);
    req.session.passUpdateAlert=true
    res.redirect("/admin/dashboard");
  });
});

router.post("/dashboard/change-info/:id", adminVerifyLogin, (req, res) => {
  (id = req.params), id;
  adminHelpers.updateUser(id, req.body).then((response) => {
    console.log(response);
    req.session.editUserAlert = true
    res.redirect("/admin");
  });
});

//search router

router.get("/dashboard/search", adminVerifyLogin, async (req, res) => {
  // console.log(req.query.key); // Corrected to req.query.key
  admin = await req.session.admin;
  adminHelpers.searchUser(req.query.key).then((users) => {
    res.render("dashboard", { users, admin });
  });
});

//logout admin router
router.get("/logout", (req, res) => {
  req.session.admin = null;
  res.redirect("/admin");
});

module.exports = router;
