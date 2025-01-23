import express from 'express';
import { createUser, getUsers, loginUser } from '../controllers/userController.js';

// create student router
const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.post("/",createUser)
userRouter.post("/login",loginUser)

export default userRouter;

// admin account - admin@gmail.com
// password - admin123

// customer account - mncustomer@gmail.com
// password - customer123
