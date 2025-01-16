import Product from "../Models/product.js";

export function getProduct(req,res){
    Product.find().then(
        (productList)=>{
            res.json({
                message:productList
            })
        }
    )
}

export function createProduct(req,res){
    const product = new Product(req.body)
    product.save().then(()=>{
        res.json({
            message:"Product is created"
        })
    }).catch(()=>{
        res.json({
            message:"product is not created"
        })
    })
}

export function deleteProduct(req,res){
    Product.deleteOne({name:req.body.name}).then(
        ()=>{
            res.json({
                message:"product is deleted successfully"
            })
        }
    )
}