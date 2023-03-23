import express from "express";
import {handleOrderSubmit,getOrders,SingleOrder} from '../controller/Order.js';

const router = express.Router();

router.post("/OrderSubmit",handleOrderSubmit);
router.get("/Orders",getOrders);
router.post("/SingleOrder",SingleOrder);


export default router;