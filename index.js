import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';



const app = express();

const mongoURL = "mongodb+srv://admin2:12345@clustermern.xn93y.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMERN"
mongoose.connect(mongoURL,{})
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Database Connected");
})


app.use(bodyParser.json())

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