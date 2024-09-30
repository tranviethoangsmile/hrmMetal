"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_delete_message = joi_1.default.object({
    message_id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
});
const validate_create_delete_message = (field) => {
    return schema_delete_message.validate(field);
};
exports.default = validate_create_delete_message;
