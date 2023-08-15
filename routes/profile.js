const express = require("express")
const router = express.Router()



router.get("/",(req,res,next)=>{
    user = req.session.user
    date = req.session.lastLogDate
    
    user ? res.render("profile",{user,title:"Profile",date}) : res.redirect("/login")
    
})

module.exports = router