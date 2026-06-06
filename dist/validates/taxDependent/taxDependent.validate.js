"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update_tax_dependent = exports.validate_create_tax_dependent = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_tax_dependent = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    name: joi_1.default.string().min(2).max(255).required(),
    dob: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    gender: joi_1.default.string().valid('MALE', 'FEMALE', 'OTHER').required(),
    identification_number: joi_1.default.string().max(20).allow(null, ''),
    phone: joi_1.default.string().max(11).allow(null, ''),
    address: joi_1.default.string().max(255).allow(null, ''),
    relationship: joi_1.default.string()
        .valid('CHILD', 'SPOUSE', 'PARENT', 'SIBLING', 'OTHER')
        .required(),
    tax_code: joi_1.default.string().max(20).allow(null, ''),
    media_path: joi_1.default.string().allow(null, ''),
    deduction_amount: joi_1.default.number().allow(null),
    status: joi_1.default.string()
        .valid('PENDING', 'APPROVED', 'REJECTED')
        .allow(null, ''),
    notes: joi_1.default.string().allow(null, ''),
});
const schema_update_tax_dependent = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    name: joi_1.default.string().min(2).max(255).allow(null, ''),
    user_id: joi_1.default.string().guid().required(),
    dob: joi_1.default.date().iso().allow(null, ''),
    gender: joi_1.default.string().valid('MALE', 'FEMALE', 'OTHER').allow(null, ''),
    identification_number: joi_1.default.string().max(20).allow(null, ''),
    phone: joi_1.default.string().max(11).allow(null, ''),
    address: joi_1.default.string().max(255).allow(null, ''),
    media_path: joi_1.default.string().allow(null, ''),
    relationship: joi_1.default.string()
        .valid('CHILD', 'SPOUSE', 'PARENT', 'SIBLING', 'OTHER')
        .allow(null, ''),
    tax_code: joi_1.default.string().max(20).allow(null, ''),
    deduction_amount: joi_1.default.number().allow(null),
    notes: joi_1.default.string().allow(null, ''),
});
const validate_update_tax_dependent = (data) => {
    return schema_update_tax_dependent.validate(data);
};
exports.validate_update_tax_dependent = validate_update_tax_dependent;
const validate_create_tax_dependent = (data) => {
    return schema_create_tax_dependent.validate(data);
};
exports.validate_create_tax_dependent = validate_create_tax_dependent;
