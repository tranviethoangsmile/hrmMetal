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
const middlewares_1 = require("../../../middlewares");
const controllers_1 = require("../../../controllers");
const helpers_1 = require("../../../helpers");
const uploadAvatar = (0, express_1.Router)();
uploadAvatar.post('/', middlewares_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_field = {
            id: req.body.id,
            avatar: req.body.media_path,
        };
        if (!(user_field === null || user_field === void 0 ? void 0 : user_field.avatar) || !(user_field === null || user_field === void 0 ? void 0 : user_field.id)) {
            const missingField = [
                !(user_field === null || user_field === void 0 ? void 0 : user_field.avatar) && 'avatar',
                !(user_field === null || user_field === void 0 ? void 0 : user_field.id) && 'user_id'
            ].filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `bad request without ${missingField}`);
        }
        const result = yield (0, controllers_1.update)(user_field);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to upload avatar');
        }
        return (0, helpers_1.successResponse)(res, 202);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = uploadAvatar;
