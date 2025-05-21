import { Router } from 'express';
import createOvertimeRequestRouter from './create/createOvertimeRequest.router';
const overtimeRequestRouter: Router = Router();

overtimeRequestRouter.use('/create', createOvertimeRequestRouter);

export default overtimeRequestRouter;
