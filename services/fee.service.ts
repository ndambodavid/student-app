import { Request, Response } from "express";
import { CatchAsyncError } from "../middleware/AsyncErrors";
import Semester from "../db/models/semester";
import Account from "../db/models/feeAccount";
import { isAfter } from "date-fns";
import { FeeStructureAttributes } from "../db/models/feeStructure";


// update account balance
export const updateBalance = async (amount: number, studentId: string) => {
    const studentAccount = await Account.findOne({where: {studentId: studentId}});
    if (studentAccount) {
        studentAccount.balance += amount;
    }
};

// set bill status
export const setBillStatus =async (dateLine: Date): Promise<string> => {
    if (isAfter(new Date, dateLine)) {
        return 'overdue';
    } else {
        return 'pending';
    }
}
// get semester name
export const getSemesterName = async (semesterId: String): Promise<string> => {
    const sem = await Semester.findOne({where: {id: semesterId}})
    return sem?.name as string;
}

// calculate fee total
export const calculateTotal = async (feeStructure: FeeStructureAttributes): Promise<number> => {
    return feeStructure.tuitionFee + feeStructure.examFee + feeStructure.libraryFee + feeStructure.projectFee;
}

// get all semesters --admin
export const getAllSemesters = CatchAsyncError(async (req: Request, res: Response) => {
    const semesters = await Semester.findAll();

    res.status(200).json({
        success: true,
        semesters
    });
});