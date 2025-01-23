import Order from "../Models/order.js";

export async function createOrder(req,res){
    // CBC0001
    // take the lates order ID

    try{
        const lastestOrder = await Order.find().sort({ date: -1 }).limit(1);
        let orderId;
    
        if (lastestOrder == 0) {
          orderId = "CBC2501";
        } else {
          const currentOrderId = lastestOrder[0].orderId;
          const numberString = currentOrderId.replace("CBC", "");
          const number = parseInt(numberString);
          const newNumber = (number + 1).toString().padStart(4, "0");
          orderId = "CBC" + newNumber;
        }
        const newOrderData = req.body;
        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;
    
        const order = new Order(newOrderData);
    
        order.save();
    
        res.json({
          message: "Order is created",
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }

}

export function getOrders(req, res) {
  Order.find({})
    .then((orders) => {
      res.json({
        list: orders,
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
}