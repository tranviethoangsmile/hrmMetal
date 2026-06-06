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
exports.handleMessage = void 0;
const openai_1 = require("openai");
const config = new openai_1.Configuration({
    apiKey: process.env.CHAT_KEY,
});
const openai = new openai_1.OpenAIApi(config);
const handleMessage = (mess) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: mess === null || mess === void 0 ? void 0 : mess.chat }],
        });
        if (response.status === 200) {
            const botResponse = (_a = response.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
            if (botResponse) {
                return {
                    success: true,
                    message: botResponse,
                };
            }
            else {
                return {
                    success: false,
                    message: 'not success',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'server error',
            };
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.handleMessage = handleMessage;
