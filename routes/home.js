var express = require('express');
var router = express.Router();

//banner display image object
let banner=[
  {
    img:"https://www.aptronixindia.com/media/slidebanner/w/a/watch_series_7_web_banner_1.png",
    active:"active"
  },
  {
    img:"https://www.aptronixindia.com/media/slidebanner/i/p/ipad_pro_2020_web_banner_1.png"
  },
  {
    img:"https://www.aptronixindia.com/media/slidebanner/a/p/apple_tv_4k_2021_web_banner_1.png"
  }
]
//product object
let products =[
  {
    name:"iphone 14",
    price:88200,
    img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-compare-iphone-14-202209?wid=364&hei=508&fmt=jpeg&qlt=90&.v=1660759995969"
  },
  {
    name:"Watch ultra",
    price:68000,
    img:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-ultra-202209?wid=340&hei=264&fmt=png-alpha&.v=1678733152901"
  },
  {
    name:"IPad Air",
    price:42200,
    img:"https://www.apple.com/v/ipad/shared/compare/l/images/overview/compare_ipad_air__o7xv886z01e2_large_2x.png"
  },
  {
    name:"Airpods Max",
    price:22300,
    img:"https://www.apple.com/v/airpods/shared/compare/b/images/compare/compare_airpods_max__b14s2x6q07rm_large_2x.png"
  },
  {
    name:"Airpods pro",
    price:18300,
    img:"https://www.apple.com/v/airpods/shared/compare/b/images/compare/compare_airpods_3rd_gen__dyuzfy04ht0m_large_2x.png"
  },
  {
    name:"Mac Studio",
    price:58200,
    img:"https://www.apple.com/v/mac-studio/f/images/overview/routers/compare/compare_mac_studio__lsaucub6skyu_large_2x.png"
  }
]
router.get('/',(req,res,next)=>{
  user = req.session.user
  user ? res.render("home",{title:"Home",products,user,banner}) : res.redirect("/login")
  })
  

module.exports = router  