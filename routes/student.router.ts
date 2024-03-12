import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createStudent, getAllstudents } from "../controllers/student.controller";

const studentRouter = express.Router();

studentRouter.post("/create-student", createStudent);

studentRouter.get("/get-students", getAllstudents);

export default studentRouter;