"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_conversation_router_1 = __importDefault(require("./create/create.conversation.router"));
const destroy_conversation_router_1 = __importDefault(require("./destroy/destroy.conversation.router"));
const conversationRouter = (0, express_1.Router)();
conversationRouter.use('/create', create_conversation_router_1.default);
conversationRouter.use('/delete', destroy_conversation_router_1.default);
exports.default = conversationRouter;
