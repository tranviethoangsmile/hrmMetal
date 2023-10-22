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
exports.create_new_message = void 0;
const message_repo_1 = require("../repositorys/message.repo");
const message_validate_1 = require("../validates/message.validate");
const create_new_message = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, message_validate_1.create_massage_validate)(data);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const new_message = yield (0, message_repo_1.create_message)(data);
            if (new_message === null || new_message === void 0 ? void 0 : new_message.success) {
                return {
                    success: new_message === null || new_message === void 0 ? void 0 : new_message.success,
                    data: new_message === null || new_message === void 0 ? void 0 : new_message.data,
                };
            }
            else {
                return {
                    success: new_message === null || new_message === void 0 ? void 0 : new_message.success,
                    message: new_message === null || new_message === void 0 ? void 0 : new_message.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: (_a = valid === null || valid === void 0 ? void 0 : valid.error) === null || _a === void 0 ? void 0 : _a.message,
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
exports.create_new_message = create_new_message;
