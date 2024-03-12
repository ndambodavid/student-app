import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./AsyncErrors";
import Errorhandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { memcache } from "../utils/cache";
import { redis } from "../utils/cache";
import { config } from 'dotenv';
config();


export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return next(new Errorhandler("Please login to access this reasource", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    console.log(decoded);

    if (!decoded) {
        return next(new Errorhandler("access token is not valid", 400));
    }

    // Cache client
    //memcache
    // memcache.get(decoded.id, (err: any, val: any) => {
    //     if (err) {
    //         console.log(err);
    //         return next(new Errorhandler(`${err}`, 404));
    //     }

    //     if (val === null) {
    //         return next(new Errorhandler("access token is not valid", 400));
    //     }

    //     if (val !== null) {
    //         req.user = JSON.parse(val);
    //     }
    // });

    // redis
    const user = await redis.get(decoded.id);
    console.log(user)
    if (user !== null) {
        req.user = JSON.parse(user);
    } else if(user === null) {
        return next(new Errorhandler("NO USER SESSION FOUND", 404));
    }

    next();
});

//validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user?.role || '')){
            return next(new Errorhandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}