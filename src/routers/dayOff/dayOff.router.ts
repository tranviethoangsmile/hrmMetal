import { Router } from 'express';
import { authAdminRole } from '../../middlewares';
import createDayOffRouter from './create/createDayOff.router';
import getAllDayOffRouter from './getAll/getAll.router';
const dayOffRouter: Router = Router();
dayOffRouter.use('/create', authAdminRole, createDayOffRouter);
dayOffRouter.use('/getall', getAllDayOffRouter);
export default dayOffRouter;
