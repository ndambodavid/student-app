import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createStudent, getAllstudents } from "../controllers/student.controller";
import { createFeeStructure, getAllFeeStructures } from "../controllers/fee.controller";

const feeRouter = express.Router();

feeRouter.post("/create-fee-structure", createFeeStructure);

feeRouter.get("/get-students", getAllFeeStructures);

export default feeRouter;