import { Router } from 'express';
import createPayrollRouter from './create/create';
import updatePayrollRouter from './update/update';
const payrollRouter: Router = Router();
payrollRouter.use('/create', createPayrollRouter);
payrollRouter.use('/update', updatePayrollRouter);
export default payrollRouter;
