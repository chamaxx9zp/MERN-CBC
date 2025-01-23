import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config()



const app = express();

const mongoURL = process.env.MONGO_DB_URL
mongoose.connect(mongoURL,{})
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Database Connected");
})


app.use(bodyParser.json())
app.use(
    (req,res,next)=>{
        const token = req.header("authorization")?.replace("Bearer ","")
        // console.log(req)
        if(token != null){
            jwt.verify(token,process.env.SECRET, (error,decoded) => {
                if(!error){
                    // console.log(decoded)
                    req.user = decoded
                }
            })
        }
        next()
    })

app.use("/users",userRouter)


app.listen(
    3001,
    ()=>{
        console.log("app run on port 3001");
    }
)