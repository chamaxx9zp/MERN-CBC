import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
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
            jwt.verify(token,"cbc-secret-key-12345", (error,decoded) => {
                if(!error){
                    // console.log(decoded)
                    req.user = decoded
                }
            })
        }
        next()
    })

app.use("/students",studentRouter)
app.use("/products",productRouter)
app.use("/users",userRouter)

// app.get("/",
//     (req,res)=>{
//         console.log(req.body)
//         console.log("Hello World this is get request")

//         res.json({
//                 message: "Hello World Response"
//             })
//     }
// )

// app.post("/",
//     (req,res)=>{
//         // console.log(req.body);
//         // console.log("Hello World Post Request")
//         // res.json({
//         //         message:"Response from the Post" + req.body.name
//         //     })
//         const newStudent = new Student(req.body)
//         newStudent.save().then(
//             ()=>{
//                 res.json({
//                     message:"student created"
//                 })
//             }
//         )
//     }
// )

app.listen(
    3001,
    ()=>{
        console.log("app run on port 3001");
    }
)