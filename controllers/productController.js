import Product from "../Models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){
    if(!isAdmin(req)){
        res.json({
            message : "Please login as administrator to add products"
        })
    }

    const newProductData = req.body
    const product = new Product(newProductData)

    product.save().then(()=>{
        res.json({
            message : "Product Created"
        })
    }).catch((error)=>{
        res.json({
            message : "Product not created" + error
        })
    })
}

export function getProducts(req,res){
    Product.find({}).then((products)=>{
        res.json(products)
    })
}
