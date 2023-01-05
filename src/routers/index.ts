import express, { Request, Response, NextFunction, Router } from 'express';
import userRouters from "./user.router";
import departmentRouters from "./department.router";
import findRouter  from './find.router';
const router = express.Router();

router.get('/', (req: Request, res: Response, next:NextFunction) => {
    res.json({
        message: "Hello World"
    });

})
router.use('/departments', departmentRouters )
router.use('/users', userRouters);
router.use('/find', findRouter)


export default router;