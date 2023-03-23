import express from "express";
import{GetProducts,customer_product} from '../controller/Products.js';

const router = express.Router();

router.get("/Products",GetProducts);
router.post("/customer_product",customer_product);


export default router;