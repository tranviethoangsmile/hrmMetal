"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update_approved_admin_overtime_request = exports.validate_delete_overtime_request = exports.validate_update_is_confirm_overtime_request = exports.validate_create_overtime_request = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const create_overtime_request_schema = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    department_id: joi_1.default.string().guid().required(),
    leader_id: joi_1.default.string().guid().required(),
    admin_id: joi_1.default.string().guid().allow(null),
    position: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    overtime_hours: joi_1.default.number().min(1).required(),
    description: joi_1.default.string().required(),
    is_confirm: joi_1.default.boolean().default(false),
    is_approved: joi_1.default.boolean().default(false),
});
const validate_create_overtime_request = (data) => {
    return create_overtime_request_schema.validate(data);
};
exports.validate_create_overtime_request = validate_create_overtime_request;
const update_is_confirm_overtime_request_schema = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
});
const validate_update_is_confirm_overtime_request = (data) => {
    return update_is_confirm_overtime_request_schema.validate(data);
};
exports.validate_update_is_confirm_overtime_request = validate_update_is_confirm_overtime_request;
const delete_overtime_request_schema = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
});
const validate_delete_overtime_request = (data) => {
    return delete_overtime_request_schema.validate(data);
};
exports.validate_delete_overtime_request = validate_delete_overtime_request;
const update_approved_admin_overtime_request_schema = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
});
const validate_update_approved_admin_overtime_request = (data) => {
    return update_approved_admin_overtime_request_schema.validate(data);
};
exports.validate_update_approved_admin_overtime_request = validate_update_approved_admin_overtime_request;
