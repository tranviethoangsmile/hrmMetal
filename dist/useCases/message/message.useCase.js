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
exports.search_message_with_id = exports.unSend_message_with_id_use = exports.search_all_message_of_conversation_use = exports.create_new_message = void 0;
const message_validate_1 = require("../../validates/message/message.validate");
const useCases_1 = require("../../useCases");
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const utils_1 = require("../../utils");
const messageRepository = new repositorys_1.MessageRepository();
const create_new_message = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const valid = (0, message_validate_1.create_massage_validate)(data);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const user = yield (0, useCases_1.findUserById)(data === null || data === void 0 ? void 0 : data.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const conversation = yield (0, useCases_1.search_conversation_by_id_use)(data === null || data === void 0 ? void 0 : data.conversation_id);
        if (!(conversation === null || conversation === void 0 ? void 0 : conversation.success)) {
            throw new Error(`${conversation === null || conversation === void 0 ? void 0 : conversation.message}`);
        }
        const conversations = yield (0, useCases_1.find_group_of_member)(data === null || data === void 0 ? void 0 : data.user_id);
        const isAuth = (_a = conversations === null || conversations === void 0 ? void 0 : conversations.data) === null || _a === void 0 ? void 0 : _a.some(value => (value === null || value === void 0 ? void 0 : value.conversation_id) === (data === null || data === void 0 ? void 0 : data.conversation_id));
        if (!isAuth) {
            throw new Error(`authentication`);
        }
        const deleteConversation = yield (0, useCases_1.find_deleted_conversation_by_conversation_id_use)(data.conversation_id);
        if (deleteConversation === null || deleteConversation === void 0 ? void 0 : deleteConversation.success) {
            yield (0, useCases_1.destroy_delete_conversation_by_conversation_id_use)(data.conversation_id);
        }
        const new_message = yield messageRepository.create_message(data);
        if (!(new_message === null || new_message === void 0 ? void 0 : new_message.success)) {
            throw new Error(`${new_message === null || new_message === void 0 ? void 0 : new_message.message}`);
        }
        const users = yield (0, useCases_1.find_user_by_conversation_id_use)(data === null || data === void 0 ? void 0 : data.conversation_id);
        if (users === null || users === void 0 ? void 0 : users.success) {
            const receiver_ids = (_b = users === null || users === void 0 ? void 0 : users.data) === null || _b === void 0 ? void 0 : _b.filter(user => String(user.dataValues.user_id) !== String(data === null || data === void 0 ? void 0 : data.user_id));
            const fcm_token = yield (0, useCases_1.find_fcm_token_of_user_use)(receiver_ids[0].user_id);
            if (fcm_token === null || fcm_token === void 0 ? void 0 : fcm_token.success) {
                const fcmToken = fcm_token === null || fcm_token === void 0 ? void 0 : fcm_token.data;
                const title = 'new Message';
                const body = (_c = new_message === null || new_message === void 0 ? void 0 : new_message.data) === null || _c === void 0 ? void 0 : _c.message;
                yield (0, utils_1.sendPushNotification)({ fcmToken, title, body });
            }
        }
        return {
            success: true,
            data: new_message === null || new_message === void 0 ? void 0 : new_message.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_new_message = create_new_message;
const search_all_message_of_conversation_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const conversations = yield messageRepository.search_all_message_of_conversation(id);
        if (!(conversations === null || conversations === void 0 ? void 0 : conversations.success)) {
            throw new Error(`${conversations === null || conversations === void 0 ? void 0 : conversations.message}`);
        }
        return {
            success: true,
            data: conversations === null || conversations === void 0 ? void 0 : conversations.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.search_all_message_of_conversation_use = search_all_message_of_conversation_use;
const unSend_message_with_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const message = yield messageRepository.search_message_with_id(id);
        if (!(message === null || message === void 0 ? void 0 : message.success)) {
            throw new Error(`${message === null || message === void 0 ? void 0 : message.message}`);
        }
        const destroy_result = yield messageRepository.unSend_message_with_id(id);
        if (!(destroy_result === null || destroy_result === void 0 ? void 0 : destroy_result.success)) {
            throw new Error(`${destroy_result === null || destroy_result === void 0 ? void 0 : destroy_result.message}`);
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
exports.unSend_message_with_id_use = unSend_message_with_id_use;
const search_message_with_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const message = yield messageRepository.search_message_with_id(id);
        if (!(message === null || message === void 0 ? void 0 : message.success)) {
            throw new Error(`${message === null || message === void 0 ? void 0 : message.message}`);
        }
        return {
            success: true,
            data: message === null || message === void 0 ? void 0 : message.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.search_message_with_id = search_message_with_id;
