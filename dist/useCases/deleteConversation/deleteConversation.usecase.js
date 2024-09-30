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
exports.destroy_delete_conversation_by_conversation_id_use = exports.find_deleted_conversation_by_conversation_id_use = exports.create_delete_conversation_use = void 0;
const controllers_1 = require("../../controllers");
const repositorys_1 = require("../../repositorys");
const useCases_1 = require("../../useCases");
const validates_1 = require("../../validates");
const deleteConversation = new repositorys_1.DeleteConversationRepository();
const create_delete_conversation_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const isValid = (0, validates_1.validate_create_delete_conversation)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const conversation = yield (0, useCases_1.search_conversation_by_id_use)(field.conversation_id);
        if (!(conversation === null || conversation === void 0 ? void 0 : conversation.success)) {
            throw new Error(`${conversation === null || conversation === void 0 ? void 0 : conversation.message}`);
        }
        const conversations = yield (0, useCases_1.find_group_of_member)(field === null || field === void 0 ? void 0 : field.user_id);
        const isAuth = (_a = conversations === null || conversations === void 0 ? void 0 : conversations.data) === null || _a === void 0 ? void 0 : _a.map(value => {
            if ((value === null || value === void 0 ? void 0 : value.conversation_id) === (field === null || field === void 0 ? void 0 : field.conversation_id)) {
                return true;
            }
            return false;
        });
        if (!isAuth) {
            throw new Error(`authentication`);
        }
        const user = yield (0, useCases_1.findUserById)(field.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const messages = yield (0, useCases_1.search_all_message_of_conversation_use)(field === null || field === void 0 ? void 0 : field.conversation_id);
        if (messages === null || messages === void 0 ? void 0 : messages.success) {
            const messageIds = (_b = messages === null || messages === void 0 ? void 0 : messages.data) === null || _b === void 0 ? void 0 : _b.map(message => message.id);
            if (Array.isArray(messageIds) && messageIds.length > 0) {
                yield Promise.all(messageIds.map((id) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        yield (0, controllers_1.create_delete_message_cotroller)({
                            user_id: field === null || field === void 0 ? void 0 : field.user_id,
                            message_id: id,
                        });
                    }
                    catch (error) {
                        throw new Error(`${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                })));
            }
        }
        const dlConversation = yield deleteConversation.create(field);
        if (!(dlConversation === null || dlConversation === void 0 ? void 0 : dlConversation.success)) {
            throw new Error(`${dlConversation === null || dlConversation === void 0 ? void 0 : dlConversation.message}`);
        }
        return {
            success: true,
            data: dlConversation === null || dlConversation === void 0 ? void 0 : dlConversation.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_delete_conversation_use = create_delete_conversation_use;
const find_deleted_conversation_by_conversation_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const conversation = yield deleteConversation.find_by_conversation_id(id);
        if (!(conversation === null || conversation === void 0 ? void 0 : conversation.success)) {
            throw new Error(`${conversation === null || conversation === void 0 ? void 0 : conversation.message}`);
        }
        return {
            success: true,
            data: conversation === null || conversation === void 0 ? void 0 : conversation.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.find_deleted_conversation_by_conversation_id_use = find_deleted_conversation_by_conversation_id_use;
const destroy_delete_conversation_by_conversation_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const conversation = yield deleteConversation.delete_by_conversation_id(id);
        if (!(conversation === null || conversation === void 0 ? void 0 : conversation.success)) {
            throw new Error(`${conversation === null || conversation === void 0 ? void 0 : conversation.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.destroy_delete_conversation_by_conversation_id_use = destroy_delete_conversation_by_conversation_id_use;
