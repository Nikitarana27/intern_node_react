import express from 'express';
import {GetData,getRootParent,deleteitem,UpdateData} from '../controllers/View.js';

const router = express.Router();

router.post("/GetData",GetData);
router.get("/getRootParent",getRootParent);
router.post("/deleteitem",deleteitem);
router.post("/UpdateData",UpdateData);

export default router;