import express, { Request, Response, NextFunction, Router } from 'express';
const router: Router = express.Router();
import { createDep } from '../controllers/department.controller'



router.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: 'Hello World!' });
    },
);

router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        const department = req.body;
       const data = await createDep(department);
       if(data) {
           res.status(201).send(data);
       }else {
           res.status(400).json({ message: 'Invalid Data' });
       }
    },
);

export default router;
