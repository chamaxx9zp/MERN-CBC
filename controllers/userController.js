import User from "../Models/user.js";
import bcrypt from "bcrypt";

export function createUser(req,res){

    const newUserdata = req.body
    newUserdata.password = bcrypt.hashSync(newUserdata.password, 10)

    const newUser = new User(newUserdata)
    newUser.save().then(()=>{
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

export function loginUser(req,res){
    User.find({email:req.body.email}).then(
        (users)=>{
            if(users.length == 0){
                res.json({
                    message:"User not found"
                })
            }else{
                const user = users[0]
                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

                if (isPasswordCorrect){
                    res.json({
                        message: "User Logged In"
                    })
                }else{
                    res.json({
                        message:"User Not Logged In. Wrong Password"
                    })
                }
            }
        }
    )
}
