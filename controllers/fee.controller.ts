import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Errorhandler from "../utils/ErrorHandler";
import Student, { StudentAttributes } from "../db/models/student";
import FeeStructure, { FeeStructureAttributes } from "../db/models/feeStructure";
import Semester from "../db/models/semester";
import Account, { AccountStructureAttributes } from "../db/models/feeAccount";
import Payment, { PaymentAttributes } from "../db/models/payment";
import { calculateTotal, getSemesterName, setBillStatus, updateBalance } from "../services/fee.service";

/**
 * POST: Add fee structure to the database
 * @returns an instance of fee structure
 */
export const createFeeStructure = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {tuitionFee, examFee, libraryFee, projectFee, dateLine, semesterId} = req.body as FeeStructureAttributes;

        let studentExists = await FeeStructure.findOne({where: {semesterId: semesterId}});
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

// create student fee account

export const createFeeAccount = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {balance, studentId} = req.body as AccountStructureAttributes;

        let accountExists = await Account.findOne({where: {studentId: studentId}});

        if (accountExists) {
            return next(new Errorhandler("account already exists", 400));
        }

        const account = await Account.create({balance, studentId});
        res.status(201).json({
            success: true,
            account,
        })
    } catch (error: any) {
        return next(new Errorhandler(error.message, 500));
    }
});


// fee payment

export const payFee = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {amount, paymentMethod, studentId} = req.body as PaymentAttributes;

        // add payment
        const deposit = await Payment.create({amount, paymentMethod, studentId});
        res.status(201).json({
            success: true,
            deposit,
        })

        // update account balance
        await updateBalance(amount, studentId as string);

    } catch (error: any) {
        return next(new Errorhandler(error.message, 500));
    }
});


// get student bill
export const generateBill = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {studentId} = req.body;

        // get student bill with details
        const student = await Student.findOne({where: {id: studentId}});

        const feeStructure =  await FeeStructure.findOne({where: {semesterId: student?.semesterId}});

        if (feeStructure) {
            const billStatus = await setBillStatus(feeStructure.dateLine as Date);
            let billTotal = await calculateTotal(feeStructure);

            const bill = {
                studentName: student?.firstName + '' + student?.lastName,
                regNo: student?.regNo,
                semesterofstudy: await getSemesterName(student?.semesterId as String),
                fees: {
                    tuitionFee: feeStructure?.tuitionFee,
                    examFee: feeStructure?.libraryFee,
                    libraryFee: feeStructure?.libraryFee,
                    projectFee: feeStructure?.projectFee
                },
                totalPayable: billTotal,
                billStatus: billStatus
            }

            res.status(200).json({
                success: true,
                bill
            })
        }

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