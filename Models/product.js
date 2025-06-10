// Importing mongoose to define the schema and interact with MongoDB
import mongoose from "mongoose";

// Defining the schema for the product collection
const productSchema = mongoose.Schema({
  // Unique identifier for the product
  productID: {
    type: String,
    unique: true,
    required: true,
  },
  // Name of the product
  productName: {
    type: String,
    required: true,
  },
  // Alternative names for the product
  altNames: [
    {
      type: String,
    },
  ],
  // Array of image URLs for the product
  images: [
    {
      type: String,
    },
  ],
  // Current price of the product
  price: {
    type: Number,
    required: true,
  },
  // Previous price of the product
  lastPrice: {
    type: Number,
    required: true,
  },
  // Number of items available in stock
  stock: {
    type: Number,
    required: true,
  },
  // Description of the product
  descriptio: {
    type: String,
    required: true,
  },
});

// Creating a model for the product collection
const Product = mongoose.model("products", productSchema);

// Exporting the Product model for use in other parts of the application
export default Product;
