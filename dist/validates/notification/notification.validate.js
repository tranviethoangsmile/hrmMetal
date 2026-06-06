"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_create_notification = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_notification = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    message: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    is_readed: joi_1.default.boolean(),
    title: joi_1.default.string().required(),
});
const validate_create_notification = (value) => {
    return schema_create_notification.validate(value);
};
exports.validate_create_notification = validate_create_notification;
