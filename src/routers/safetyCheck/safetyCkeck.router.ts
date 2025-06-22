import { Router } from 'express';
import createSafetyCheckRouter from './create/create.router';
import searchSafetyCheckedRouter from './searchSafetyChecked/searchSafetyChecked.router';
import getAllUserCheckedSafetyCheckEventRouter from './getAllUserCheckedSafetyCheckEvent/getAllUserCheckedSafetyCheckEvent.router';
const safetyCheckRouter: Router = Router();

safetyCheckRouter.use('/create', createSafetyCheckRouter);
safetyCheckRouter.use('/searchsafetychecked', searchSafetyCheckedRouter);
safetyCheckRouter.use(
    '/getallusercheckedsafetycheckevent',
    getAllUserCheckedSafetyCheckEventRouter,
);
export default safetyCheckRouter;
