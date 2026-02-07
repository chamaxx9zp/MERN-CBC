// Importing the Order model to interact with the order collection in the database
import Order from "../Models/order.js";
// Importing the Product model to look up product details and validate stock
import Product from "../Models/product.js";

// Function to create a new order
export async function createOrder(req, res) {
  try {
    const { orderedItems: requestedItems, name, address, phone, notes, paymentId } = req.body;

    // Validate required fields
    if (!requestedItems?.length || !name || !address || !phone) {
      return res.status(400).json({
        message: "Missing required fields: orderedItems (array with productId and quantity), name, address, phone.",
      });
    }

    // Look up each product and build orderedItems with name, image, price; validate availability
    const orderedItems = [];
    for (const item of requestedItems) {
      const { productId, quantity } = item;
      if (!productId || quantity == null || quantity < 1) {
        return res.status(400).json({
          message: `Each ordered item must have productId and quantity (positive number). Invalid item: ${JSON.stringify(item)}`,
        });
      }

      const product = await Product.findOne({ productID: productId });
      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${productId}`,
        });
      }
      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.productName}" (${productId}). Available: ${product.stock}, requested: ${quantity}.`,
        });
      }

      orderedItems.push({
        productId: product.productID,
        name: product.productName,
        image: product.images?.[0] ?? "",
        quantity,
        price: product.price,
      });
    }

    // Generate a unique order ID for the new order
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1);
    let orderId;
    if (latestOrder.length === 0) {
      orderId = "CBC2501";
    } else {
      const currentOrderId = latestOrder[0].orderId;
      const numberString = currentOrderId.replace("CBC", "");
      const number = parseInt(numberString, 10);
      const newNumber = (number + 1).toString().padStart(4, "0");
      orderId = "CBC" + newNumber;
    }

    const newOrderData = {
      orderId,
      email: req.user.email,
      orderedItems,
      date: req.body.date ? new Date(req.body.date) : new Date(),
      name,
      address,
      phone,
      notes: notes ?? "",
      paymentId: paymentId ?? "",
      status: req.body.status ?? "Preparing",
    };

    const order = new Order(newOrderData);
    await order.save();

    res.json({
      message: "Order is created",
    });
  } catch (error) {
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
