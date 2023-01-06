import express, { Request, Response, NextFunction, Router } from 'express';
import userRouters from "./user.router";
import departmentRouters from "./department.router";
import findRouter  from './find.router';
import foodRouter from './food.router';
import canteenRouter from './canteen.router';
const router = express.Router();

router.get('/', (req: Request, res: Response, next:NextFunction) => {
    res.json({
        message: "Hello World"
    });

})
router.use('/departments', departmentRouters )
router.use('/users', userRouters);
router.use('/find', findRouter)
router.use('/food', foodRouter);
router.use('/canteen', canteenRouter);


export default router;