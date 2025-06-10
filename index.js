// Importing express to create the server and handle routing
import express from "express";
// Importing body-parser to parse incoming JSON requests
import bodyParser from "body-parser";
// Importing mongoose to connect and interact with the MongoDB database
import mongoose from "mongoose";
// Importing userRouter to handle user-related routes
import userRouter from "./routes/userRouter.js";
// Importing productRouter to handle product-related routes
import productRouter from "./routes/productRouter.js";
// Importing orderRouter to handle order-related routes
import orderRouter from "./routes/orderRouter.js";
// Importing jsonwebtoken to verify and decode JWT tokens for authentication
import jwt from "jsonwebtoken";
// Importing dotenv to load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Create an instance of the Express application
const app = express();

// Connect to the MongoDB database using the URL from environment variables
const mongoURL = process.env.MONGO_DB_URL;
mongoose.connect(mongoURL, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connected"); // Log a message when the database connection is successful
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Middleware to decode and verify JWT tokens from the "authorization" header
app.use((req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", ""); // Extract the token from the header
  if (token != null) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (!error) {
        req.user = decoded; // Attach the decoded user information to the request object
      }
    });
  }
  next(); // Proceed to the next middleware or route handler
});

// Define routes for users, products, and orders
app.use("/users", userRouter); // Routes for user-related operations
app.use("/products", productRouter); // Routes for product-related operations
app.use("/orders", orderRouter); // Routes for order-related operations

// Start the server and listen on port 3001
app.listen(3001, () => {
  console.log("app run on port 3001"); // Log a message when the server starts successfully
});
