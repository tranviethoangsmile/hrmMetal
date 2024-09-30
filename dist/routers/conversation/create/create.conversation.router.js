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
const createConversationRouter = (0, express_1.Router)();
createConversationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        if (!reqData || !(reqData === null || reqData === void 0 ? void 0 : reqData.receiver_id) || !(reqData === null || reqData === void 0 ? void 0 : reqData.sender_id)) {
            return res.status(400).json({
                success: true,
                message: 'data not empty',
            });
        }
        const value = yield (0, controllers_1.create_conversation_controller)(reqData);
        if (value === null || value === void 0 ? void 0 : value.success) {
            return res.status(201).json({
                success: value === null || value === void 0 ? void 0 : value.success,
                data: value === null || value === void 0 ? void 0 : value.data,
            });
        }
        else {
            return res.status(200).json({
                success: value === null || value === void 0 ? void 0 : value.success,
                meessage: value === null || value === void 0 ? void 0 : value.message,
            });
        }
    }
    catch (e) {
        return res.status(500).send({
            success: false,
            message: 'Server error: ' + (e === null || e === void 0 ? void 0 : e.message),
        });
    }
}));
exports.default = createConversationRouter;
