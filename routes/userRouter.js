import express from 'express';
import { createUser, getUsers } from '../controllers/userController.js';

// create student router
const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.post("/",createUser)

// studentRouter.delete("/",deleteStudent)

export default userRouter;