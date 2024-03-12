import { NextFunction, Response } from 'express';
import { User } from '../models/user';
import { memcache } from './cache';
import { redis } from './cache';
import { config } from 'dotenv';
import Errorhandler from './ErrorHandler';
config();

interface TokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

// parse environment variables to integrate with Fallback
const accessTokenExpiry = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '5', 10)
const refreshTokenExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '3', 10)

// options for cookies
export const accessTokenOptions: TokenOptions = {
    expires: new Date(Date.now() + (accessTokenExpiry * 60 * 1000)),
    maxAge: accessTokenExpiry * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
}

 export const refreshTokenOptions: TokenOptions = {
    expires: new Date(Date.now() + (refreshTokenExpiry * 24 * 60 * 60 * 1000)),
    maxAge: refreshTokenExpiry * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
}


export const sendToken = async (user: User, statusCode: number, res: Response) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();

    // upload session to Cache
    // memecached client

    // memcache.set(JSON.stringify(user._id), JSON.stringify(user), {expires: 60}, (err, val) => {
    //     if (err) {
    //         return next(new Errorhandler(`${err}`, 400));
    //     }

    //     if (val) {
    //         console.log(val);
    //     }
    // });

    // redis client
    const session = await redis.set(user._id, JSON.stringify(user), "EX", 300);
    // console.log(session);
    
    // only set secure to true in production
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}