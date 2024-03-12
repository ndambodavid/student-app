import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Errorhandler from "../utils/ErrorHandler";
import Semester, { SemesterAttributes } from "../db/models/semester";

// create semester
export const createSemester = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name} = req.body as SemesterAttributes;
        const semester = await Semester.create({name});
        res.status(201).json({
            success: true,
            semester,
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 500));
    }
});


// get all semesters
export const getAllSemesters = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Semester.findAll();

        res.status(200).json({
            success: true,
            result
        });
        
    } catch (error: any) {
        return next(new Errorhandler(error.message, 500));
    }
});

