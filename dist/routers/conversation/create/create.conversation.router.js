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
const createConversationRouter = (0, express_1.Router)();
createConversationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        if (!reqData || !(reqData === null || reqData === void 0 ? void 0 : reqData.receiver_id) || !(reqData === null || reqData === void 0 ? void 0 : reqData.sender_id)) {
            return (0, helpers_1.errorResponse)(res, 400, 'receiver_id and sender_id are required');
        }
        const value = yield (0, controllers_1.create_conversation_controller)(reqData);
        if (value === null || value === void 0 ? void 0 : value.success) {
            return (0, helpers_1.successResponse)(res, 201, value === null || value === void 0 ? void 0 : value.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, (value === null || value === void 0 ? void 0 : value.message) || 'Failed to create conversation');
        }
    }
    catch (e) {
        return (0, helpers_1.errorResponse)(res, 500, (e === null || e === void 0 ? void 0 : e.message) || 'Internal server error');
    }
}));
exports.default = createConversationRouter;
