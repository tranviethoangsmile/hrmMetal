import {Request, Response, NextFunction } from "express";

const LIMIT_HOURS_ORDER_FROM = 8;
const LIMIT_HOURS_ORDER_TO = 10;
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