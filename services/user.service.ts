import { NextFunction, Response } from "express";
import UserModel from "../db/user";
import { redis } from "../utils/cache";
import { CatchAsyncError } from "../middleware/AsyncErrors";

// get user by id
export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(201).json({
            success: true,
            user,
        });
    }
};

// get all users
export const getAllUsersService = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find().sort({ createAt: -1});

    res.status(200).json({
        success: true,
        users
    });
});

// update user role
export const updateUserRoleService = async (res: Response, id: string, role: string) => {
    const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true});

    res.status(201).json({
        success: true,
        user
    })
}