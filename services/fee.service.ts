import { Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Semester from "../db/models/semester";


// create semester
export const feePayment = CatchAsyncError(async (data: any, res: Response) => {
    const semester = Semester.build(data);
    await semester.save()
    res.status(201).json({
        success: true,
        semester,
    })
});

// get all semesters --admin
export const getAllSemesters = CatchAsyncError(async (req: Request, res: Response) => {
    const semesters = await Semester.findAll();

    res.status(200).json({
        success: true,
        semesters
    });
});