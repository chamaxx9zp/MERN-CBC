// Importing mongoose to define the schema and interact with MongoDB
import mongoose from "mongoose";

// Defining the schema for the order collection
const orderSchema = mongoose.Schema({
  // Unique identifier for the order
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  // Email of the user who placed the order
  email: {
    type: String,
    required: true,
  },
  // List of items included in the order
  orderedItems: [
    {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  // Date when the order was placed
  date: {
    type: Date,
    required: true,
  },
  // Payment ID associated with the order
  paymentId: {
    type: String,
  },
  // Current status of the order
  status: {
    type: "String",
    required: true,
    default: "Preparing",
  },
  // Additional notes for the order
  notes: {
    type: String,
  },
  // Name of the person who placed the order
  name: {
    type: String,
    required: true,
  },
  // Address for the order delivery
  address: {
    type: String,
    required: true,
  },
  // Contact phone number for the order
  phone: {
    type: String,
    required: true,
  },
});

// Creating a model for the order collection
const Order = mongoose.model("orders", orderSchema);

// Exporting the Order model for use in other parts of the application
export default Order;
