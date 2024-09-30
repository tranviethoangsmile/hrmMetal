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
const destroyConversationRouter = (0, express_1.Router)();
destroyConversationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !(field === null || field === void 0 ? void 0 : field.conversation_id) || !(field === null || field === void 0 ? void 0 : field.user_id)) {
            return res.status(400).json({
                success: false,
                message: `bad request`,
            });
        }
        const dlConversation = yield (0, controllers_1.delete_conversation_controller)(Object.assign({}, field));
        if (!(dlConversation === null || dlConversation === void 0 ? void 0 : dlConversation.success)) {
            return res.status(200).json({
                success: false,
                message: `${dlConversation === null || dlConversation === void 0 ? void 0 : dlConversation.message}`,
            });
        }
        return res.status(201).json({
            success: true,
            data: dlConversation === null || dlConversation === void 0 ? void 0 : dlConversation.data,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: `server error: ${error === null || error === void 0 ? void 0 : error.meessage}`,
        });
    }
}));
exports.default = destroyConversationRouter;
