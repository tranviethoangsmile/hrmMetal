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
exports.login_user = void 0;
const login_repository_1 = require("../repositorys/login.repository");
const login_validate_1 = require("../validates/login.validate");
const login_user = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, login_validate_1.validate_login)(user);
        if (!valid.error) {
            const login_data = yield (0, login_repository_1.login)(user);
            if (login_data === null || login_data === void 0 ? void 0 : login_data.success) {
                return {
                    success: true,
                    data: login_data === null || login_data === void 0 ? void 0 : login_data.data,
                    token: login_data === null || login_data === void 0 ? void 0 : login_data.token,
                };
            }
            else {
                return {
                    success: false,
                    message: login_data === null || login_data === void 0 ? void 0 : login_data.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: valid === null || valid === void 0 ? void 0 : valid.error.message,
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
exports.login_user = login_user;
