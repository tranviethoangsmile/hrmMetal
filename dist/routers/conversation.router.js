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
const conversation_controller_1 = require("../controllers/conversation.controller");
const socketIO_1 = require("../socket/socketIO");
const conversationRouter = (0, express_1.Router)();
conversationRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = req.body;
        if (responseData && Object.keys(responseData).length === 0) {
            res.status(400).json({
                success: true,
                message: 'data not empty',
            });
        }
        else {
            const value = yield (0, conversation_controller_1.create_conversation)(responseData);
            if (value === null || value === void 0 ? void 0 : value.success) {
                socketIO_1.io.emit('conversationid', value === null || value === void 0 ? void 0 : value.data);
                res.status(201).json({
                    success: value === null || value === void 0 ? void 0 : value.success,
                    data: value === null || value === void 0 ? void 0 : value.data,
                });
            }
            else {
                socketIO_1.io.emit('mess', 'hello');
                res.status(200).json({
                    success: value === null || value === void 0 ? void 0 : value.success,
                    meessage: value === null || value === void 0 ? void 0 : value.message,
                });
            }
        }
    }
    catch (e) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + (e === null || e === void 0 ? void 0 : e.message),
        });
    }
}));
exports.default = conversationRouter;
