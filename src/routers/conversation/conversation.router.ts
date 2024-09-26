import { Router } from 'express';
import createConversationRouter from './create/create.conversation.router';
import destroyConversationRouter from './destroy/destroy.conversation.router';
const conversationRouter: Router = Router();

conversationRouter.use('/create', createConversationRouter);
conversationRouter.use('/delete', destroyConversationRouter);

export default conversationRouter;
