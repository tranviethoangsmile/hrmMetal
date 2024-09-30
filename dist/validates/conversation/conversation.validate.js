"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_create_conversation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const create_conversation_validate = joi_1.default.object({
    sender_id: joi_1.default.string().guid().required(),
    receiver_id: joi_1.default.string().guid().required(),
});
const validate_create_conversation = (field) => {
    return create_conversation_validate.validate(field);
};
exports.validate_create_conversation = validate_create_conversation;
