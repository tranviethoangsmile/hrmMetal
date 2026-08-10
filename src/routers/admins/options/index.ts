import { Router } from 'express';
import getEnumRouter from './getEnum.router';
const optionsRouter: Router = Router();
optionsRouter.use('/get-enums', getEnumRouter);

export default optionsRouter;
