// Importing the Order model to interact with the order collection in the database
import Order from "../Models/order.js";

// Function to create a new order
export async function createOrder(req, res) {
  // Generate a unique order ID for the new order
  try {
    // Fetch the latest order from the database, sorted by date in descending order
    const lastestOrder = await Order.find().sort({ date: -1 }).limit(1);
    let orderId;

    // If no orders exist, start with a default order ID
    if (lastestOrder.length == 0) {
      orderId = "CBC2501";
    } else {
      // Extract the numeric part of the latest order ID and increment it
      const currentOrderId = lastestOrder[0].orderId;
      const numberString = currentOrderId.replace("CBC", "");
      const number = parseInt(numberString);
      const newNumber = (number + 1).toString().padStart(4, "0");
      orderId = "CBC" + newNumber;
    }

    // Add the generated order ID and user email to the new order data
    const newOrderData = req.body;
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;

    // Create a new order instance and save it to the database
    const order = new Order(newOrderData);
    order.save();

    // Send a success response
    res.json({
      message: "Order is created",
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      message: error.message,
    });
  }
}

// Function to retrieve all orders from the database
export function getOrders(req, res) {
  // Query the database to find all orders
  Order.find({})
    .then((orders) => {
      // Send the retrieved orders as a JSON response
      res.json({
        list: orders,
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the query
      res.json({
        message: error,
      });
    });
}
