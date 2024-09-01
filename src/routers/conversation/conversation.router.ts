import { Router } from 'express';
import createConversationRouter from './create/create.conversation.router';
const conversationRouter: Router = Router();

conversationRouter.use('/create', createConversationRouter);

export default conversationRouter;
