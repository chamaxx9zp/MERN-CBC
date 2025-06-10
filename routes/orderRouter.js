// Importing express to create the router
import express from "express";
// Importing controller functions to handle order-related routes
import { createOrder, getOrders } from "../controllers/orderController.js";

// Creating a router instance for order-related routes
const orderRouter = express.Router();

// Route to create a new order
orderRouter.post("/", createOrder);

// Route to get all orders
orderRouter.get("/", getOrders);

// Exporting the router to be used in the main application
export default orderRouter;
