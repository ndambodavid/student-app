import { Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Semester from "../db/models/semester";
import Account from "../db/models/feeAccount";


// update account balance
export const updateBalance = async (amount: number, studentId: String) => {
    const studentAccount = await Account.findOne({where: {studentId: studentId}});
    if (studentAccount) {
        studentAccount.balance += amount;
    }
};

// get all semesters --admin
export const getAllSemesters = CatchAsyncError(async (req: Request, res: Response) => {
    const semesters = await Semester.findAll();

    res.status(200).json({
        success: true,
        semesters
    });
});