import { Router } from 'express';
import getOrderRouter from './getOrderRouter';
import createOrderRouter from './createOrderRouter.router';
const orderRouter: Router = Router();
orderRouter.use('/get-orders', getOrderRouter);
orderRouter.use('/create-orders', createOrderRouter);
export default orderRouter;
