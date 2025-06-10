// Importing the User model to interact with the user collection in the database
import User from "../Models/user.js";
// Importing bcrypt for password hashing
import bcrypt from "bcrypt";
// Importing jsonwebtoken for generating authentication tokens
import jsonwebtoken from "jsonwebtoken";
// Importing dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config();

// Function to create a new user
export function createUser(req, res) {
  // Extracting new user data from the request body
  const newUserdata = req.body;

  // Check if the user is trying to create an admin account
  if (newUserdata.type == "admin") {
    // Ensure the current user is logged in and is an admin
    if (req.user == null || req.user.type != "admin") {
      res.json({
        message: "Please login as administrator to create admin accounts",
      });
      return; // Exit the function to prevent further execution
    }
  }

  // Hash the user's password before saving it to the database
  newUserdata.password = bcrypt.hashSync(newUserdata.password, 10);

  // Create a new user instance and save it to the database
  const newUser = new User(newUserdata);
  newUser
    .save()
    .then(() => {
      res.json({
        message: "User is created",
      });
    })
    .catch(() => {
      res.json({
        message: "User is not created",
      });
    });
}

// Function to retrieve all users from the database
export function getUsers(req, res) {
  User.find().then((userList) => {
    res.json({
      list: userList,
    });
  });
}

// Function to log in a user
export function loginUser(req, res) {
  // Find the user by email
  User.find({ email: req.body.email }).then((users) => {
    if (users.length == 0) {
      res.json({
        message: "User not found",
      });
    } else {
      const user = users[0];
      // Compare the provided password with the stored hashed password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (isPasswordCorrect) {
        // Generate a JWT token for the user
        const token = jsonwebtoken.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isBlocked: user.isBlocked,
            type: user.type,
            profilePic: user.profilePic,
          },
          process.env.SECRET
        );

        res.json({
          message: "User logged In",
          token: token,
        });
      } else {
        res.json({
          message: "User Not Logged In. Wrong Password",
        });
      }
    }
  });
}

// Function to check if the current user is an admin
export function isAdmin(req) {
  if (req.user == null || req.user.type != "admin") {
    return false;
  }
  return true;
}

// Function to check if the current user is a customer
export function isCustomer(req) {
  if (req.user == null || req.user.type != "customer") {
    return false;
  }
  return true;
}
