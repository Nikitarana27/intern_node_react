import express from "express";
import{getMyCart,handleQuantityAdd,handleQuantitySubtract,handleRemove} from '../controller/Cart.js';

const router = express.Router();

router.get("/MyCart",getMyCart);
router.post("/QuantityAdd",handleQuantityAdd);
router.post("/QuantitySubtract",handleQuantitySubtract);
router.post("/handleRemove",handleRemove);


export default router;