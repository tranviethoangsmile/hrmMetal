import { Router } from 'express';
import createInformationRouter from './infomationRouterModule/createInformation.router';
const informationRouter: Router = Router();
informationRouter.use('/create', createInformationRouter);
export default informationRouter;
