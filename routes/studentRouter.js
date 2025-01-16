import express from 'express';
import Student from '../Models/student.js';
import { getStudents, createStudent, deleteStudent } from '../controllers/studentController.js';

// create student router
const studentRouter = express.Router();

studentRouter.get("/",getStudents)

studentRouter.post("/",createStudent)

studentRouter.delete("/",deleteStudent)

export default studentRouter;