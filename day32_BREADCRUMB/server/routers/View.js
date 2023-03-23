import express from 'express';
import {GetData,getRootParent,deleteitem} from '../controllers/View.js';

const router = express.Router();

router.post("/GetData",GetData);
router.get("/getRootParent",getRootParent);
router.post("/deleteitem",deleteitem);

export default router;