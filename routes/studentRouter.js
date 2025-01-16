import express from 'express';
import Student from '../Models/student.js';

// create student router
const studentRouter = express.Router();

studentRouter.get("/",(req,res)=>{
   Student.find().then(
    (studentList)=>{
        res.json({
            list:studentList
        })
   })
})

studentRouter.post("/",(req,res)=>{
    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message:"Student is created"
        })
    }).catch(()=>{
        res.json({
            message:"Student is not created"
        })
    })

   
})

export default studentRouter;