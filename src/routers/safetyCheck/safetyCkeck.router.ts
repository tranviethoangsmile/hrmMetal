import { Router } from 'express';
import createSafetyCheckRouter from './create/create.router';

const safetyCheckRouter: Router = Router();

safetyCheckRouter.use('/create', createSafetyCheckRouter);

export default safetyCheckRouter;
