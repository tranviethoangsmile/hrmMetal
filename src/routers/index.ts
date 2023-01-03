import express, { Request, Response, NextFunction, Router } from 'express';
import userRouters from "./user.router";
import departmentRouters from "./department.router";
const router = express.Router();

router.get('/', (req: Request, res: Response, next:NextFunction) => {
    res.json({
        message: "Hello World"
    });

})
router.use('/departments', departmentRouters )
router.use('/users', userRouters);


export default router;