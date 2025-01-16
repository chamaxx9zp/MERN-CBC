import express from 'express';
import { getProduct, createProduct, deleteProduct} from '../controllers/productController.js';

// create student router
const productRouter = express.Router();

productRouter.get("/",getProduct)
productRouter.post("/",createProduct)
productRouter.delete("/",deleteProduct)

export default productRouter;