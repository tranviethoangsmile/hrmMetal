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
const models_1 = require("../../models");
class ConversationRepository {
    create_conversation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield models_1.Conversation.create(Object.assign({}, data));
                if (conversation === null) {
                    throw new Error(`create conversation faild`);
                }
                return {
                    success: true,
                    data: conversation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    search_conversation_by_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield models_1.Conversation.findByPk(id, {
                    attributes: ['id', 'title', 'member_count'],
                });
                if (conversation === null) {
                    throw new Error(`conversation not exist`);
                }
                return {
                    success: true,
                    data: conversation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
}
exports.default = ConversationRepository;
