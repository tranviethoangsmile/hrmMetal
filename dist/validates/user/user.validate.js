"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid_find_by_name = exports.valid_user_find_all_with_field = exports.valid_user_update = exports.valid_user_create = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_user_create = joi_1.default.object({
    name: joi_1.default.string().min(5).max(99).required(),
    user_name: joi_1.default.string().min(5).max(99).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(5).max(99).required(),
    dob: joi_1.default.date().required(),
    phone: joi_1.default.string().regex(/^[0-9]{10}$/),
    avatar: joi_1.default.string(),
    ic_id: joi_1.default.string(),
    employee_id: joi_1.default.number().integer().min(1000).max(999999).required(),
    is_active: joi_1.default.boolean().default(false),
    is_admin: joi_1.default.boolean().default(false),
    is_officer: joi_1.default.boolean().default(false),
    role: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    department_id: joi_1.default.string().guid(),
    begin_date: joi_1.default.string(),
    is_offical_staff: joi_1.default.boolean().default(false),
    salary_hourly: joi_1.default.number().integer().min(100).max(999999),
    shift_night_pay: joi_1.default.number().integer().min(100).max(999999),
    travel_allowance_pay: joi_1.default.number().integer().min(100).max(999999),
    paid_days: joi_1.default.number().min(0).max(999999),
});
const schema_user_update = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    name: joi_1.default.string().min(5).max(99),
    user_name: joi_1.default.string().min(5).max(99),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(5).max(99),
    dob: joi_1.default.date(),
    phone: joi_1.default.string().regex(/^[0-9]{10}$/),
    avatar: joi_1.default.string(),
    ic_id: joi_1.default.string(),
    employee_id: joi_1.default.number().integer().min(1000).max(999999),
    is_active: joi_1.default.boolean().default(false),
    is_admin: joi_1.default.boolean().default(false),
    is_officer: joi_1.default.boolean().default(false),
    role: joi_1.default.string(),
    position: joi_1.default.string(),
    department_id: joi_1.default.string().guid(),
    begin_date: joi_1.default.string(),
    is_offical_staff: joi_1.default.boolean().default(false),
    salary_hourly: joi_1.default.number().integer().min(100).max(999999),
    shift_night_pay: joi_1.default.number().integer().min(100).max(999999),
    travel_allowance_pay: joi_1.default.number().integer().min(100).max(999999),
    paid_days: joi_1.default.number().min(0).max(999999),
});
const schema_user_find_all_with_field = joi_1.default.object({
    position: joi_1.default.string(),
});
const schema_find_by_name = joi_1.default.string().min(1).max(99).required();
const valid_user_create = (data) => {
    return schema_user_create.validate(data);
};
exports.valid_user_create = valid_user_create;
const valid_user_update = (data) => {
    return schema_user_update.validate(data);
};
exports.valid_user_update = valid_user_update;
const valid_user_find_all_with_field = (data) => {
    return schema_user_find_all_with_field.validate(data);
};
exports.valid_user_find_all_with_field = valid_user_find_all_with_field;
const valid_find_by_name = (name) => {
    return schema_find_by_name.validate(name);
};
exports.valid_find_by_name = valid_find_by_name;
