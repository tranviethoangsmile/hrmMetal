"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageRouter = (0, express_1.Router)();
const create_message_router_1 = __importDefault(require("./create/create.message.router"));
const search_all_message_of_conversation_router_1 = __importDefault(require("./search_all_message_of_conversation/search_all_message_of_conversation.router"));
const unSend_message_with_id_router_1 = __importDefault(require("./unSens_message_with_id/unSend_message_with_id.router"));
const deleteMessage_router_1 = __importDefault(require("./deleteMessage/deleteMessage.router"));
messageRouter.use('/create', create_message_router_1.default);
messageRouter.use('/searchmessageofconversation', search_all_message_of_conversation_router_1.default);
messageRouter.use('/unsend', unSend_message_with_id_router_1.default);
messageRouter.use('/delete', deleteMessage_router_1.default);
exports.default = messageRouter;
