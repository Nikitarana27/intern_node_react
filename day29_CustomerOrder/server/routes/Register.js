import express from "express";
import{createEmployee,createtoken,Profile,Edit} from '../controller/Register.js';
// import{GetProducts,customer_product} from '../controller/Products.js';

const router = express.Router();

router.post("/register",createEmployee);
router.post("/Login",createtoken);
router.get("/Profile",Profile);
router.post("/edit",Edit);
// router.get("/Products",GetProducts);
// router.get("/customer_product",customer_product);

export default router;