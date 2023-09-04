var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb');


module.exports={
    getUsers: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const usersArray = await db.get().collection(collection.USER_COLLECTION).find().toArray();
            resolve(usersArray);
          } catch (error) {
            reject(error);
          }
        });
      },
      doAthUpdate:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            adminData.pass = await bcrypt.hash(adminData.pass,10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((res)=>{
                resolve(res)
            })
        })
      },
      doLogin:(adminData)=>{
        return new Promise(async (resolve,reject)=>{
            response={}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email})
            if(admin){
                bcrypt.compare(adminData.pass,admin.pass).then((status)=>{
                    if(status){
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        resolve({status:false})
                    }
                })
            }else{
                resolve({status:false})
            }
            
        })
      },
      deleteUser:(userData)=>{
        return new Promise((resolve,reject)=>{
          let userObjectId = new ObjectId(userId);
          console.log(userObjectId);
          db.get().collection(collection.USER_COLLECTION).deleteOne({_id:userObjectId}).then((response)=>{
            resolve(response)
          }).catch((err)=>{
            reject(err)
          })
        })
      },
      getUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
          let userObjectId = new ObjectId(userId);
          db.get().collection(collection.USER_COLLECTION).findOne({_id:userObjectId}).then((response)=>{
            resolve(response)
          }).catch((err)=>{
            reject(err)
          })
        })
      },
      changePass:(password,userId)=>{
        return new Promise(async(resolve,reject)=>{
          let userObjectId = new ObjectId(userId);
          newPass = await bcrypt.hash(password,10)
          db.get().collection(collection.USER_COLLECTION).updateOne({_id:userObjectId},{$set:{pass:newPass}}).then((response)=>{
            resolve(response)
          }).catch((err)=>{
            reject(err)
          })
          
        })
      },
      updateUser:(userId,data)=>{
        return new Promise((resolve,reject)=>{
          let userObjectId = new ObjectId(userId);
          db.get().collection(collection.USER_COLLECTION).updateOne({_id:userObjectId},{$set:{userName:data.userName,email:data.email}}).then((response)=>{
            resolve(response)
          }).catch((err)=>{
            reject(err)
          })
        })
      },
      searchUser:(key)=>{
        return new Promise(async(resolve,reject)=>{
          let SearchData = await db.get().collection(collection.USER_COLLECTION).find({
            "$or":[
              {userName:{$regex:key}},
              {email:{$regex:key}},
              {createDate:{$regex:key}}
            ]
          }).toArray()
          resolve(SearchData)
        })
      }
      
      //end of fn
}