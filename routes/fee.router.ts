import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createStudent, getAllstudents } from "../controllers/student.controller";
import { createFeeAccount, createFeeStructure, generateBill, getAllFeeStructures, payFee } from "../controllers/fee.controller";

const feeRouter = express.Router();

feeRouter.post("/create-fee-structure",isAuthenticated,authorizeRoles("admin"), createFeeStructure);

feeRouter.post("/create-fee-account",isAuthenticated,authorizeRoles("admin"), createFeeAccount);

feeRouter.post("/pay-fees",isAuthenticated, authorizeRoles("admin"), payFee);

feeRouter.get("/view-bill",isAuthenticated, generateBill);

feeRouter.get("/get-students",isAuthenticated, authorizeRoles("admin"), getAllFeeStructures);

export default feeRouter;