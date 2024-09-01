import { Router } from 'express';
const messageRouter: Router = Router();
import createMessageRouter from './create/create.message.router';
import searchMessageByConversationRouter from './search_all_message_of_conversation/search_all_message_of_conversation.router';
messageRouter.use('/create', createMessageRouter);
messageRouter.use(
    '/searchmessageofconversation',
    searchMessageByConversationRouter,
);
export default messageRouter;
