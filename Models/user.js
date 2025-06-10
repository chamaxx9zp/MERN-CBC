// Importing mongoose to define the schema and interact with MongoDB
import mongoose from "mongoose";

// Defining the schema for the user collection
const userSchema = mongoose.Schema({
  // Email of the user (unique identifier)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // First name of the user
  firstName: {
    type: String,
    required: true,
  },
  // Last name of the user
  lastName: {
    type: String,
    required: true,
  },
  // Encrypted password of the user
  password: {
    type: String,
    required: true,
  },
  // Indicates if the user is blocked
  isBlocked: {
    type: Boolean,
    default: false,
  },
  // Type of user (e.g., admin, customer)
  type: {
    type: String,
    default: "customer",
  },
  // Profile picture URL of the user
  profilePic: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1737304557~exp=1737308157~hmac=290cbfbb2815208ac3272b9aed3fea41e303b62ded6b30dbdab46d26425f815b&w=1380",
  },
});

// Creating a model for the user collection
const User = mongoose.model("users", userSchema);

// Exporting the User model for use in other parts of the application
export default User;
