import express, { Request, Response, NextFunction, Router } from 'express';
const departmentRouters: Router = express.Router();

departmentRouters.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Hello World!' });
})

export default departmentRouters;

