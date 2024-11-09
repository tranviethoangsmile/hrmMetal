import { Router } from 'express';
import createConversationRouter from './create/create.conversation.router';
import destroyConversationRouter from './destroy/destroy.conversation.router';
import createGroupMessageRouter from './create_group/create_group.conversation.router';
const conversationRouter: Router = Router();

conversationRouter.use('/create', createConversationRouter);
conversationRouter.use('/delete', destroyConversationRouter);
conversationRouter.use('/creategroup', createGroupMessageRouter);

export default conversationRouter;
