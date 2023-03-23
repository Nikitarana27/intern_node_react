import express from 'express';
import {getParentForSelection,ParentEnter,ChildEnter} from '../controllers/Category.js';

const router = express.Router()

router.get("/getParentForSelection",getParentForSelection);
router.post("/ChildEnter",ChildEnter);
router.post("/ParentEnter",ParentEnter);

export default router;