import { Router } from 'express';
const messageRouter: Router = Router();
import createMessageRouter from './create/create.message.router';
import searchMessageByConversationRouter from './search_all_message_of_conversation/search_all_message_of_conversation.router';
import unSendMessageRouter from './unSens_message_with_id/unSend_message_with_id.router';
import deleteMessageRouter from './deleteMessage/deleteMessage.router';
messageRouter.use('/create', createMessageRouter);
messageRouter.use(
    '/searchmessageofconversation',
    searchMessageByConversationRouter,
);
messageRouter.use('/unsend', unSendMessageRouter);
messageRouter.use('/delete', deleteMessageRouter);
export default messageRouter;
