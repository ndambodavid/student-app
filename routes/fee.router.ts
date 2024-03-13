import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createStudent, getAllstudents } from "../controllers/student.controller";
import { createFeeAccount, createFeeStructure, generateBill, getAllFeeStructures, payFee } from "../controllers/fee.controller";

const feeRouter = express.Router();

feeRouter.post("/create-fee-structure", createFeeStructure);

feeRouter.post("/create-fee-account", createFeeAccount);

feeRouter.post("/pay-fees", payFee);

feeRouter.get("/view-bill", generateBill);

feeRouter.get("/get-students", getAllFeeStructures);

export default feeRouter;