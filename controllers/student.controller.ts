import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Errorhandler from "../utils/ErrorHandler";
import Student, { StudentAttributes } from "../db/models/student";

/**
 * POST: Add new student to the database
 * @returns an instance of student
 */
export const createStudent = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {firstName, lastName, address, regNo, userId, semesterId} = req.body as StudentAttributes;

        let studentExists = await Student.findOne({where: {regNo: regNo}});
        if (studentExists) {
            return next(new Errorhandler("Student already exists", 400));
        }

        const student: StudentAttributes = await Student.create({firstName, lastName, address, regNo, userId, semesterId});
        res.status(201).json({
            success: true,
            student,
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 500));
    }
});

// get all students -- only admin
export const getAllstudents = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: StudentAttributes[] = await Student.findAll();
        res.status(200).json({
            success: true,
            result,
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 400));
    }
});