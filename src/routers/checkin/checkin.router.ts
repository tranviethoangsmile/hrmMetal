import { Router } from 'express';
import createCheckin from './checkinRouterModule/createCheckin.router';
import veyrTimeCheck from '../../middlewares/veryTimeCheck.middleware';
import checkinSearchRouter from './checkinRouterModule/searchCheckedOfUserInMonth';
import getCheckinIndateOfPosition from './checkinRouterModule/getCheckinsInDateOfPosition';
import checkinDetailRouter from './checkinRouterModule/getCheckinInDataOfUser';
const checkinRouter: Router = Router();

checkinRouter.use('/create', createCheckin);
checkinRouter.use('/search', checkinSearchRouter);
checkinRouter.use('/getcheckinindateofposition', getCheckinIndateOfPosition);
checkinRouter.use('/getcheckindetailindateofuser', checkinDetailRouter);

export default checkinRouter;
