import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createSemester, getAllSemesters } from "../controllers/semester.controller";

const semesterRouter = express.Router();

semesterRouter.post("/create-semester",isAuthenticated, authorizeRoles("admin"), createSemester);

semesterRouter.get(
    "/get-semesters",
    getAllSemesters
);


export default semesterRouter;