// Importing the Product model to interact with the product collection in the database
import Product from "../Models/product.js";
// Importing the isAdmin function to check if the user is an administrator
import { isAdmin } from "./userController.js";

// Function to create a new product
export function createProduct(req, res) {
  // Check if the user is an administrator
  if (!isAdmin(req)) {
    // If not an admin, send a response with an error message
    res.json({
      message: "Please login as administrator to add products",
    });
    return; // Exit the function to prevent further execution
  }

  // Extracting new product data from the request body
  const newProductData = req.body;
  // Creating a new product instance using the extracted data
  const product = new Product(newProductData);

  // Saving the product to the database
  product
    .save()
    .then(() => {
      // If successful, send a success message
      res.json({
        message: "Product Created",
      });
    })
    .catch((error) => {
      // If an error occurs, send an error message with details
      res.json({
        message: "Product not created: " + error,
      });
    });
}

// Function to retrieve all products from the database
export function getProducts(req, res) {
  // Query the database to find all products
  Product.find({}).then((products) => {
    // Send the retrieved products as a JSON response
    res.json(products);
  });
}
