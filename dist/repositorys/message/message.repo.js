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
class MessageRepository {
    create_message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield models_1.Message.create(Object.assign({}, data));
                if (message === null) {
                    throw new Error(`create message failed`);
                }
                return {
                    success: true,
                    data: message,
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
    search_all_message_of_conversation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield models_1.Message.findAll({
                    where: {
                        conversation_id: id,
                    },
                    attributes: [
                        'id',
                        'message',
                        'user_id',
                        'created_at',
                        'is_unsend',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            as: 'user',
                            attributes: ['id', 'avatar'],
                        },
                        {
                            model: models_1.DeleteMessage,
                            as: 'delete_messages',
                            attributes: ['id', 'user_id', 'message_id'],
                        },
                    ],
                });
                if (messages === null || messages.length < 1) {
                    throw new Error(`message not exist`);
                }
                return {
                    success: true,
                    data: messages,
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
    unSend_message_with_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Message.update({
                    is_unsend: true,
                }, {
                    where: {
                        id: id,
                    },
                });
                if (result[0] < 1) {
                    throw new Error(`update not successfully`);
                }
                return {
                    success: true,
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
    search_message_with_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield models_1.Message.findByPk(id, {
                    attributes: ['id', 'message', 'user_id', 'created_at'],
                });
                if (message === null) {
                    throw new Error(`message not exists`);
                }
                return {
                    success: true,
                    data: message,
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
exports.default = MessageRepository;
