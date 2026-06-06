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
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const helpers_1 = require("../../helpers");
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user || !user.password || !user.user_name) {
            const missingFields = [
                !user.password && 'password',
                !user.user_name && 'user_name',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing values: ${missingFields}`);
        }
        const token = yield (0, controllers_1.login)(user);
        if (token === null || token === void 0 ? void 0 : token.success) {
            // Login có token riêng, cần custom response
            return res.status(202).json({
                success: true,
                data: token === null || token === void 0 ? void 0 : token.data,
                token: token === null || token === void 0 ? void 0 : token.token,
            });
        }
        else {
            return (0, helpers_1.errorResponse)(res, 401, (token === null || token === void 0 ? void 0 : token.message) || 'Login failed');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = loginRouter;
