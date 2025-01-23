import Product from "../Models/product.js";

export async function getProduct(req,res){
    try{
        const productList = await Product.find()
        res.json({
            list : productList
        })
    }catch(e){
        res.json({
            message:"Error in get product function"+e
        })
    }
   
}

export function createProduct(req,res){
    // console.log(req.user)

    if(req.user == null){
        res.json({
            message : "You are not logged In"
        })
        return
    }
    if(req.user.type != "admin"){
        res.json({
            message : "You are not an Admin"
        })
        return
    }

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

export function getProductbyName(req,res){
    const Pname = req.params.urlParam

    Product.find({name:Pname}).then(
        (productList)=>{
            
            if(productList.length == 0){
                res.json({
                    message:"product is not found"
                })
            }else{
                res.json({
                    list:productList
                })
            }

        }
    ).catch(
        ()=>{
            res.json({
                message: "product found error"
            })
        }
    )
}