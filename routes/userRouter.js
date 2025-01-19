import express from 'express';
import { createUser, getUsers, loginUser } from '../controllers/userController.js';

// create student router
const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.post("/",createUser)
userRouter.post("/login",loginUser)

// studentRouter.delete("/",deleteStudent)

export default userRouter;