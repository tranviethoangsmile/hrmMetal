import { Router } from 'express';
import createOvertimeRequestRouter from './create.router';
import destroyOvertimeRequestRouter from './destroy.router';
const overtimeRequestRouter: Router = Router();

overtimeRequestRouter.use('/create', createOvertimeRequestRouter);
overtimeRequestRouter.use('/destroy', destroyOvertimeRequestRouter);

export default overtimeRequestRouter;
