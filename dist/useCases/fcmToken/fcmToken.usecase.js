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
exports.find_fcm_token_of_user_use = exports.create_fcm_token_use = void 0;
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const enum_1 = require("../../enum");
const useCases_1 = require("../../useCases");
const fcmTokenRepository = new repositorys_1.FcmTokenRepository();
const create_fcm_token_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_fcm_token)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!Object.values(enum_1.Device).includes(field === null || field === void 0 ? void 0 : field.device_type)) {
            throw new Error(`device_type not valid`);
        }
        const user = yield (0, useCases_1.findUserById)(field === null || field === void 0 ? void 0 : field.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const getFcmToken = yield fcmTokenRepository.find_fcm_token_of_user(field === null || field === void 0 ? void 0 : field.user_id);
        if (getFcmToken === null || getFcmToken === void 0 ? void 0 : getFcmToken.success) {
            yield fcmTokenRepository.destroy_old_fcm_token_of_user(field === null || field === void 0 ? void 0 : field.user_id);
        }
        const fcmToken = yield fcmTokenRepository.create(field);
        if (!(fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.success)) {
            throw new Error(`${fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.message}`);
        }
        return {
            success: true,
            data: fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_fcm_token_use = create_fcm_token_use;
const find_fcm_token_of_user_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const fcmToken = yield fcmTokenRepository.find_fcm_token_of_user(id);
        if (!(fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.success)) {
            throw new Error(`${fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.message}`);
        }
        return {
            success: true,
            data: (_a = fcmToken === null || fcmToken === void 0 ? void 0 : fcmToken.data) === null || _a === void 0 ? void 0 : _a.fcm_token,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.find_fcm_token_of_user_use = find_fcm_token_of_user_use;
