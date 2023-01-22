import express, { Request, Response, NextFunction, Router } from 'express';
import userRouters from "./user.router";
import departmentRouters from "./department.router";
import findRouter  from './find.router';
import foodRouter from './food.router';
import canteenRouter from './canteen.router';
import orderRouter from './order.router';
import loginRouter from './login.router'
import rpRouter from './dailyReport.router';
const router = express.Router();

router.get('/', (req: Request, res: Response, next:NextFunction) => {
    res.send({
        message: 'Hello World'
    })
})

router.use('/department', departmentRouters )
router.use('/user', userRouters);
router.use('/find', findRouter)
router.use('/food', foodRouter);
router.use('/canteen', canteenRouter);
router.use('/order', orderRouter)
router.use('/login', loginRouter)
router.use('/dailyreport', rpRouter)

export default router;