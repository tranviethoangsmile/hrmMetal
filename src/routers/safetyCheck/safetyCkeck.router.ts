import { Router } from 'express';
import createSafetyCheckRouter from './create/create.router';
import searchSafetyCheckedRouter from './searchSafetyChecked/searchSafetyChecked.router';
const safetyCheckRouter: Router = Router();

safetyCheckRouter.use('/create', createSafetyCheckRouter);
safetyCheckRouter.use('/searchsafetychecked', searchSafetyCheckedRouter);
export default safetyCheckRouter;
