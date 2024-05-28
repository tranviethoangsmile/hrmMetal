import { Router } from 'express';
import createEvenCheck from './create/createEvenCheck.router';
import searchEventCheckedRouter from './search/searchEventChecked.router';
const evenCheckRouter: Router = Router();
evenCheckRouter.use('/create', createEvenCheck);
evenCheckRouter.use('/searcheventchecked', searchEventCheckedRouter);
export default evenCheckRouter;
