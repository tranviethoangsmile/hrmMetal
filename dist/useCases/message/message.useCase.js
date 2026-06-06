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
const useCases_1 = require("../../useCases");
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const services_1 = require("../../services");
const enum_1 = require("../../enum");
const messageRepository = new repositorys_1.MessageRepository();
const pushNotificationService = new services_1.PushNotificationService();
const create_new_message = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const valid = (0, validates_1.create_massage_validate)(data);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        if (!Object.values(enum_1.E_message_type).includes(data.message_type)) {
            throw new Error(`message_type not valid`);
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
            const sender_info = (_b = users === null || users === void 0 ? void 0 : users.data) === null || _b === void 0 ? void 0 : _b.find(user => {
                return (user === null || user === void 0 ? void 0 : user.user_id) === (data === null || data === void 0 ? void 0 : data.user_id);
            });
            const receiver_ids = (_c = users === null || users === void 0 ? void 0 : users.data) === null || _c === void 0 ? void 0 : _c.filter(user => String(user.dataValues.user_id) !== String(data === null || data === void 0 ? void 0 : data.user_id));
            for (const receiver of receiver_ids) {
                const fcm_token = yield (0, useCases_1.find_fcm_token_of_user_use)(receiver.user_id);
                if (fcm_token === null || fcm_token === void 0 ? void 0 : fcm_token.success) {
                    const fcmToken = (_d = fcm_token.data) !== null && _d !== void 0 ? _d : '';
                    const title = (_e = sender_info === null || sender_info === void 0 ? void 0 : sender_info.dataValues.users.name) !== null && _e !== void 0 ? _e : 'New message';
                    const body = (_g = (_f = new_message === null || new_message === void 0 ? void 0 : new_message.data) === null || _f === void 0 ? void 0 : _f.message) !== null && _g !== void 0 ? _g : '';
                    const key = data === null || data === void 0 ? void 0 : data.conversation_id;
                    yield pushNotificationService.handlePushNotiForMessage({
                        fcmToken,
                        title,
                        body,
                        key
                    });
                }
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
