import express from 'express';
import {getEmployees,addEmployees,getEmployee,updateemployee,DeleteEmployee} from '../controllers/Employees.js';
import {getHR,addInHrTable,getOneHR,updateInHrTable,DeleteHrDetail} from '../controllers/Hr.js';
import {getBranches,addBranch,getBranche,updateBranch,DeleteBranch} from '../controllers/Branch.js';

const router = express.Router();
router.get("/getEmployees",getEmployees);
router.post("/getEmployee",getEmployee);
router.post("/addEmployees",addEmployees);
router.post("/updateemployee",updateemployee);
router.post("/DeleteEmployee",DeleteEmployee);

router.get("/getHR",getHR);
router.post("/getOneHR",getOneHR);
router.post("/addInHrTable",addInHrTable);
router.post("/updateInHrTable",updateInHrTable);
router.post("/DeleteHrDetail",DeleteHrDetail);

router.get("/getBranches",getBranches);
router.post("/addBranch",addBranch);
router.post("/getBranche",getBranche);
router.post("/updateBranch",updateBranch);
router.post("/DeleteBranch",DeleteBranch);

export default router;