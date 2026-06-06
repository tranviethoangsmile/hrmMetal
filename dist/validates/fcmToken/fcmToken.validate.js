"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_create_fcm_token = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_fcmToken = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    fcm_token: joi_1.default.string().required(),
    device_type: joi_1.default.string().required(),
    app_version: joi_1.default.string().required(),
    device_id: joi_1.default.string().required(),
});
const validate_create_fcm_token = (field) => {
    return schema_create_fcmToken.validate(field);
};
exports.validate_create_fcm_token = validate_create_fcm_token;
