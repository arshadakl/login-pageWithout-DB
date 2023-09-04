var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.pass=await bcrypt.hash(userData.pass,10)
            currentDate = new Date()
            userData.createDate = currentDate.toLocaleString();
            userData
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then(async(res)=>{
                res.user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
                resolve(res)
                // console.log(res);
            })
        }).catch((err)=>{
            reject(err)
        })

    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}

            let user =await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.pass,user.pass).then((status)=>{
                    if(status){
                        console.log("Login Success..");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("Login failed");
                        response.status=false
                        resolve({status:false})
                    }
                })
            }else{
                resolve({status:false})
            }
        })
    },
    userExist:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let status = {}
            let userEmail = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData})
            if(userEmail){
                status.email=true
                resolve(status)
            }else{
                status.email=false
                resolve(status)
            }
        }).catch((err)=>{
            reject(err)
        })
    },
    getProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collection.PRODUCTS_COLLECTION).find().toArray()
            resolve(products)
        }).catch((err)=>[
            reject(err)
        ])
    },
    getBanner:()=>{
        return new Promise(async(resolve,reject)=>{
            let banner = await db.get().collection(collection.BANNER_COLLECTION).find().toArray()
            resolve(banner)
        }).catch((err)=>[
            reject(err)
        ])
    }

}


// users=[
//     {
//     name:"admin1",
//     email:"admin@gmail.com",
//     password:"1234"
// },
// {
//     name:"admin2",
//     email:"admin2@gmail.com",
//     password:"321"
// },
// {
//     name:"King Basi",
//     email:"king@gmail.com",
//     password:"123"
// }
// ]

// module.exports = users;

