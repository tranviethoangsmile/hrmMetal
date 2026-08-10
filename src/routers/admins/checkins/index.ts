import { Router } from 'express';
import getCheckinsRouter from './getCheckinsRouter';
const checkinRouter: Router = Router();
checkinRouter.use('/get-checkins', getCheckinsRouter);

export default checkinRouter;
