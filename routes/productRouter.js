// Importing express to create the router
import express from "express";
// Importing controller functions to handle product-related routes
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

// Creating a router instance for product-related routes
const productRouter = express.Router();

// Route to get all products
productRouter.get("/", getProducts);

// Route to create a new product
productRouter.post("/", createProduct);

// Exporting the router to be used in the main application
export default productRouter;
