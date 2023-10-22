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
const openai_1 = require("openai");
const socketIO_1 = require("../socket/socketIO");
const chatRouter = (0, express_1.Router)();
const config = new openai_1.Configuration({
    apiKey: process.env.CHAT_KEY,
});
const openai = new openai_1.OpenAIApi(config);
chatRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const chat = req.body.chat;
        const response = yield openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: chat }],
        });
        if (response.status === 200) {
            const botResponse = (_a = response.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
            if (botResponse) {
                for (let i = 0; i < botResponse.length; i++) {
                    setTimeout(() => {
                        socketIO_1.io.emit('messgpt', botResponse[i]);
                    }, 5 * i);
                }
            }
            res.status(201).json({
                success: true,
                message: botResponse,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'server chat error ...!!!',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
}));
exports.default = chatRouter;
