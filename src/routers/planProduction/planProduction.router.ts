import { Router } from 'express';
import createPlanProductionRouter from './create/create.router';
import updatePlanProductionRouter from './update/update.router';
import searchByIdPlanProductionRouter from './search/searchById.router';
import destroyPlanProductionRouter from './destroy/destroy.router';
import searchByDateOfDepartmentRouter from './searchByDateAndDepartment/searchByDateAndDepartment.router';
const planProductionRouter: Router = Router();
planProductionRouter.use('/create', createPlanProductionRouter);
planProductionRouter.use('/update', updatePlanProductionRouter);
planProductionRouter.use('/searchbyid', searchByIdPlanProductionRouter);
planProductionRouter.use('/destroy', destroyPlanProductionRouter);
planProductionRouter.use(
    '/searchbydateanddepartment',
    searchByDateOfDepartmentRouter,
);
export default planProductionRouter;
