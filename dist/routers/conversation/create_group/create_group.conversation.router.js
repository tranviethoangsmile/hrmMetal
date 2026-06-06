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
const createGroupMessageRouter = (0, express_1.Router)();
createGroupMessageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.body;
        if (!data ||
            typeof (data === null || data === void 0 ? void 0 : data.title) !== 'string' ||
            typeof (data === null || data === void 0 ? void 0 : data.sender_id) !== 'string') {
            return (0, helpers_1.errorResponse)(res, 400, 'title and sender_id are required');
        }
        if (!Array.isArray(data === null || data === void 0 ? void 0 : data.receivers) || (data === null || data === void 0 ? void 0 : data.receivers.length) < 2) {
            return (0, helpers_1.errorResponse)(res, 400, 'receivers array must have at least 2 members');
        }
        const conversation = yield (0, controllers_1.create_conversation_group_controller)(data);
        if (!(conversation === null || conversation === void 0 ? void 0 : conversation.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (conversation === null || conversation === void 0 ? void 0 : conversation.message) || 'Failed to create group conversation');
        }
        return (0, helpers_1.successResponse)(res, 201, { conversation_id: (_a = conversation === null || conversation === void 0 ? void 0 : conversation.data) === null || _a === void 0 ? void 0 : _a.conversation_id });
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createGroupMessageRouter;
