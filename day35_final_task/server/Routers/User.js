import express from 'express'
import {handleAddUser,getUsers,getUser,handleEditUser,handleChangeProfile,handleStatus,deleteUser} from '../Controllers/User.js' 
import {handleExport} from "../Controllers/Export.js"
import {handleImport} from '../Controllers/Import.js'
import { upload } from '../middleware/Multer.js';

const router = express.Router();

router.post("/handleAddUser",upload.single('img'), handleAddUser);
router.get("/getUsers", getUsers);
router.post("/getUser",getUser);
router.post("/handleStatus",handleStatus);
router.post("/deleteUser",deleteUser);
router.put("/handleEditUser/:id",upload.single('img') , handleEditUser);
router.put("/handleChangeProfile/:id",upload.single('img') , handleChangeProfile);

router.post("/handleExport",handleExport);
router.get("/handleImport",handleImport);
export default router;