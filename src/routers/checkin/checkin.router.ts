import { Router } from 'express';
import createCheckin from './checkinRouterModule/createCheckin.router';
import veyrTimeCheck from '../../middlewares/veryTimeCheck.middleware';
import checkinSearchRouter from './checkinRouterModule/searchCheckedOfUserInMonth';
import getCheckinIndateOfPosition from './checkinRouterModule/getCheckinsInDateOfPosition';
const checkinRouter: Router = Router();

checkinRouter.use('/create', createCheckin);
checkinRouter.use('/search', checkinSearchRouter);
checkinRouter.use('/getcheckinofdate', getCheckinIndateOfPosition);

export default checkinRouter;
