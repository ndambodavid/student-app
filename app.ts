import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.router';
import { config } from 'dotenv';
import semesterRouter from './routes/semester.router';
import studentRouter from './routes/student.router';
import feeRouter from './routes/fee.router';
config();

//server
export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
    origin: ['*'],
    credentials: true,
}));

//routes
app.use('/api/v1', userRouter);

app.use('/api/v1', semesterRouter);

app.use('/api/v1', studentRouter);

app.use('/api/v1', feeRouter);


// testing api 
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working'
    });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

app.use(ErrorMiddleware);