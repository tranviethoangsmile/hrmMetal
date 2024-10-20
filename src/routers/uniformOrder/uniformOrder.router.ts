import { Router } from 'express';
import createUniformOrderRouter from './create/create.router';
const uniformOrderRouter: Router = Router();
uniformOrderRouter.use('/create', createUniformOrderRouter);
export default uniformOrderRouter;
