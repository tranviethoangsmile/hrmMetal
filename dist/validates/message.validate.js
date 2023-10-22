"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_massage_validate = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_message_valid = joi_1.default.object({
    content: joi_1.default.string().max(1000).min(1).required(),
    sender_id: joi_1.default.string().guid().required(),
    conversation_id: joi_1.default.string().guid().required(),
});
const create_massage_validate = (data) => {
    return schema_message_valid.validate(data);
};
exports.create_massage_validate = create_massage_validate;
