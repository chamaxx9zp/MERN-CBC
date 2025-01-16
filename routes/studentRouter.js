import express from 'express';

// create student router
const studentRouter = express.Router();

studentRouter.get("/",(req,res)=>{
    console.log("This is a request for student get router");
    res.json({
        message: "This is a get request for the student router"
    })
})

studentRouter.post("/",(req,res)=>{
    console.log("This is a request for student post router");
    res.json({
        message: "This is a post request for the student router"
    })
})

export default studentRouter;