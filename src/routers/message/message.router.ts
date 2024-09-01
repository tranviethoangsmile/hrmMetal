import { Router } from 'express';
const messageRouter: Router = Router();
import createMessageRouter from './create/create.message.router';
messageRouter.use('/create', createMessageRouter);
export default messageRouter;
