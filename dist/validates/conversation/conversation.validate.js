"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_create_conversation_group = exports.validate_create_conversation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const create_conversation_validate = joi_1.default.object({
    sender_id: joi_1.default.string().guid().required(),
    receiver_id: joi_1.default.string().guid().required(),
});
const create_conversation_group_validate = joi_1.default.object({
    title: joi_1.default.string().required(),
    sender_id: joi_1.default.string().guid().required(),
    receivers: joi_1.default.array()
        .items(joi_1.default.object({
        user_id: joi_1.default.string().guid().required(),
    }))
        .min(2)
        .required(),
});
const validate_create_conversation = (field) => {
    return create_conversation_validate.validate(field);
};
exports.validate_create_conversation = validate_create_conversation;
const validate_create_conversation_group = (field) => {
    return create_conversation_group_validate.validate(field);
};
exports.validate_create_conversation_group = validate_create_conversation_group;
