"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const helpers_1 = require("../../../helpers");
const searchMessageByConversationRouter = (0, express_1.Router)();
searchMessageByConversationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation_id = req.body.conversation_id;
        if (!conversation_id || conversation_id === undefined) {
            return (0, helpers_1.errorResponse)(res, 400, 'conversation_id is required');
        }
        const messages = yield (0, controllers_1.search_all_message_of_conversation_controller)(conversation_id);
        if (!(messages === null || messages === void 0 ? void 0 : messages.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (messages === null || messages === void 0 ? void 0 : messages.message) || 'Failed to get messages');
        }
        return (0, helpers_1.successResponse)(res, 200, messages.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = searchMessageByConversationRouter;
