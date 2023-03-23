import express from 'express'
import {handleAddUser,getUsers,getUser} from '../Controllers/User.js' 
import { upload } from '../middleware/Multer.js';

const router = express.Router();

router.post("/handleAddUser",upload.single('img'), handleAddUser);
router.get("/getUsers", getUsers);
router.post("/getUser",getUser)

export default router;