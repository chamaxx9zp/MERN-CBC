// Importing express to create the router
import express from "express";
// Importing controller functions to handle user-related routes
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/userController.js";

// Creating a router instance for user-related routes
const userRouter = express.Router();

// Route to get all users
userRouter.get("/", getUsers);

// Route to create a new user
userRouter.post("/", createUser);

// Route to log in a user
userRouter.post("/login", loginUser);

// Exporting the router to be used in the main application
export default userRouter;

// Example admin account credentials
// Email: admin@gmail.com
// Password: admin123

// Example customer account credentials
// Email: mncustomer@gmail.com
// Password: customer123
