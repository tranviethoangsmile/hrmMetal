"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid_user_update = exports.valid_user_create = void 0;
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
    role: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    department_id: joi_1.default.string().guid(),
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
    role: joi_1.default.string(),
    position: joi_1.default.string(),
    department_id: joi_1.default.string().guid(),
});
const valid_user_create = (data) => {
    return schema_user_create.validate(data);
};
exports.valid_user_create = valid_user_create;
const valid_user_update = (data) => {
    return schema_user_update.validate(data);
};
exports.valid_user_update = valid_user_update;
