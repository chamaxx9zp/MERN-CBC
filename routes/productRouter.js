import express from 'express';

// create student router
const productRouter = express.Router();

productRouter.get("/",(req,res)=>{
    console.log("This is a request for product get router");
    res.json({
        message: "This is a get request for the product router"
    })
})

productRouter.post("/",(req,res)=>{
    console.log("This is a request for product post router");
    res.json({
        message: "This is a post request for the product router"
    })
})

export default productRouter;