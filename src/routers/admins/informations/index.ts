import { Router } from 'express';
import createInformationRouter from './createInformationRouter.router';
import getinformationsRouter from './getInformations.router';
import informationDeleteRouter from './deleteInformationRouter.router';
const informationRouter: Router = Router();
informationRouter.use('/create-information', createInformationRouter);
informationRouter.use('/delete-informations', informationDeleteRouter);
informationRouter.use('/get-informations', getinformationsRouter);
export default informationRouter;
