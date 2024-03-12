import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Errorhandler from "../utils/ErrorHandler";
import Student, { StudentAttributes } from "../db/models/student";
import FeeStructure, { FeeStructureAttributes } from "../db/models/feeStructure";
import Semester from "../db/models/semester";

/**
 * POST: Add fee structure to the database
 * @returns an instance of fee structure
 */
export const createFeeStructure = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {tuitionFee, examFee, libraryFee, projectFee, dateLine, semesterId} = req.body as FeeStructureAttributes;

        let studentExists = await FeeStructure.findOne({where: {}});
        if (studentExists) {
            return next(new Errorhandler("fee structure already exists", 400));
        }

        const student = await FeeStructure.create({tuitionFee, examFee, libraryFee, projectFee, dateLine, semesterId});
        res.status(201).json({
            success: true,
            student,
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 500));
    }
});

// get all fee structures -- only admin
export const getAllFeeStructures = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: FeeStructureAttributes[] = await FeeStructure.findAll();
        res.status(200).json({
            success: true,
            result,
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 400));
    }
});