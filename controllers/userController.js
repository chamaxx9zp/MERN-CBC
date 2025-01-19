import User from "../Models/user.js";

export function createUser(req,res){
    const user = new User(req.body)
    user.save().then(()=>{
        res.json({
            message:"User is created"
        })
    }).catch(()=>{
        res.json({
            message:"User is not created"
        })
    })
}

export function getUsers(req,res){
    User.find().then(
     (userList)=>{
         res.json({
             list:userList
         })
    })
}
