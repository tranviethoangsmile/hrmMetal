import { Router } from 'express';
import createDepartmentRouter from './create.router';
const departmentRouter: Router = Router();
departmentRouter.use('/create-department', createDepartmentRouter);
export default departmentRouter;
