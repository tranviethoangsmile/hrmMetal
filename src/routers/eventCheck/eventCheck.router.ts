import { Router } from 'express';
import createEventCheck from './create/createEventCheck.router';
import searchEventCheckedRouter from './search/searchEventChecked.router';
const eventCheckRouter: Router = Router();
eventCheckRouter.use('/create', createEventCheck);
eventCheckRouter.use('/searcheventchecked', searchEventCheckedRouter);
export default eventCheckRouter;
