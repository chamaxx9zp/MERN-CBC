import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export function createUser(req,res){

    const newUserdata = req.body

    if(newUserdata.type == "admin"){
        if(req.user == null){
            res.json({
                message : "Please login as administartor to create admin accounts"
            })
            return
        }

        if(req.user.type != "admin"){
            res.json({
                message : "Please login as administartor to create admin accounts"
            })
            return
        }
    }

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
                    const token = jsonwebtoken.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        isBlocked : user.isBlocked,
                        type : user.type,
                        profilePic : user.profilePic
                    }, process.env.SECRET)
                    // console.log(token)
                    res.json({
                        message : "User logged In",
                        token : token
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

export function isAdmin(req){
    if(req.user == null){
        return false
    }

    if(req.user.type != "admin"){
        return false
    }

    return true
}

