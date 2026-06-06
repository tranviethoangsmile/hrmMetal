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
exports.create_delete_message_use = void 0;
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const index_1 = require("../index");
const deleteMessageRepo = new repositorys_1.DeleteMessageRepository();
const create_delete_message_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_delete_message)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const message = yield (0, index_1.search_message_with_id)(field === null || field === void 0 ? void 0 : field.message_id);
        if (!(message === null || message === void 0 ? void 0 : message.success)) {
            throw new Error(`${message === null || message === void 0 ? void 0 : message.message}`);
        }
        // if (message?.data?.user_id !== field?.user_id) {
        //     throw new Error('You are not the owner of this message');
        // }
        const user = yield (0, index_1.findUserById)(field === null || field === void 0 ? void 0 : field.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const create_delete_message = yield deleteMessageRepo.create(field);
        if (!(create_delete_message === null || create_delete_message === void 0 ? void 0 : create_delete_message.success)) {
            throw new Error(`${create_delete_message === null || create_delete_message === void 0 ? void 0 : create_delete_message.message}`);
        }
        return {
            success: true,
            data: create_delete_message === null || create_delete_message === void 0 ? void 0 : create_delete_message.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_delete_message_use = create_delete_message_use;
