import {Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
dotenv.config();
const LIMIT_HOURS_ORDER_FROM = process.env.LIMIT_HOURS_ORDER_FROM || 0;
const LIMIT_HOURS_ORDER_TO = process.env.LIMIT_HOURS_ORDER_TO || 24;
const timeOrderLimit = (req: Request, res: Response ,next: NextFunction) => {
    const currentHour: number = new Date().getHours();
    if(currentHour > LIMIT_HOURS_ORDER_FROM && currentHour <= LIMIT_HOURS_ORDER_TO){
        return next();
    }else {
        return res.status(400).json({
            message: "time limited"
        });
    }
}

export { timeOrderLimit }