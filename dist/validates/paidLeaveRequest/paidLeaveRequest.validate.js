"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_search_paid = exports.validate_update_paid = exports.validate_create_paid = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create = joi_1.default.object({
    reason: joi_1.default.string().required(),
    user_id: joi_1.default.string().guid().required(),
    leader_id: joi_1.default.string().guid().required(),
    date_request: joi_1.default.string().min(8).max(11).required(),
    date_leave: joi_1.default.string().min(8).max(11).required(),
    is_paid: joi_1.default.boolean(),
    position: joi_1.default.string().required(),
    is_half: joi_1.default.boolean().required(),
});
const validate_create_paid = (data) => {
    return schema_create.validate(data);
};
exports.validate_create_paid = validate_create_paid;
const schema_update = joi_1.default.object({
    user_id: joi_1.default.string().guid(),
    feedback: joi_1.default.string(),
    is_confirm: joi_1.default.boolean(),
    admin_id: joi_1.default.string(),
    id: joi_1.default.string().guid().required(),
});
const validate_update_paid = (date) => {
    return schema_update.validate(date);
};
exports.validate_update_paid = validate_update_paid;
const schema_search_leave_request_with_field = joi_1.default.object({
    user_id: joi_1.default.string().guid(),
    leader_id: joi_1.default.string().guid(),
    date_request: joi_1.default.string().min(8).max(11),
    date_leave: joi_1.default.string().min(8).max(11),
    position: joi_1.default.string(),
    is_confirm: joi_1.default.boolean(),
    is_approve: joi_1.default.boolean(),
});
const validate_search_paid = (data) => {
    return schema_search_leave_request_with_field.validate(data);
};
exports.validate_search_paid = validate_search_paid;
