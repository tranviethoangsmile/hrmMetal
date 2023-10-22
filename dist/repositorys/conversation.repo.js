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
exports.create_conversation = void 0;
const models_1 = require("../models");
const create_conversation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield models_1.Conversation.create(Object.assign({}, data));
        if (conversation != null) {
            return {
                success: true,
                data: conversation,
            };
        }
        else {
            return {
                success: false,
                message: 'create conversation failed',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create_conversation = create_conversation;
