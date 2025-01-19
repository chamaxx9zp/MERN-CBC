import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePic : {
        type : String,
        default : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1737304557~exp=1737308157~hmac=290cbfbb2815208ac3272b9aed3fea41e303b62ded6b30dbdab46d26425f815b&w=1380"
    }


})

const User = mongoose.model("users", userSchema)

export default User;