import { Router } from 'express';
import createCheckin from './checkinRouterModule/createCheckin.router';
import veyrTimeCheck from '../../middlewares/veryTimeCheck.middleware';
import checkinSearchRouter from './checkinRouterModule/searchCheckedOfUserInMonth';
const checkinRouter: Router = Router();

checkinRouter.use('/create', createCheckin);
checkinRouter.use('/search', checkinSearchRouter);

export default checkinRouter;
