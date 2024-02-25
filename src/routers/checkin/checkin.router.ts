import { Router } from 'express';
import createCheckin from './checkinRouterModule/createCheckin.router';
import veyrTimeCheck from '../../middlewares/veryTimeCheck.middleware';
const checkinRouter: Router = Router();

checkinRouter.use('/create', createCheckin);

export default checkinRouter;
