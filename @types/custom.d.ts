import { Request } from "express";
import { User } from "../models/user";

declare global {
    namespace Express {
        interface Request{
            user?: User;
        }
    }
}