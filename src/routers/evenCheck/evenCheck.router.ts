import { Router } from 'express';
import createEvenCheck from './create/createEvenCheck.router';
const evenCheckRouter: Router = Router();
evenCheckRouter.use('/create', createEvenCheck);
export default evenCheckRouter;
