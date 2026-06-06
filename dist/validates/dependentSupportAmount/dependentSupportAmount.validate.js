"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_get_dependent_support_amount_by_tax_dependent_id_and_year = exports.validate_delete_dependent_support_amount = exports.validate_update_dependent_support_amount = exports.validate_create_dependent_support_amount = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_dependent_support_amount = joi_1.default.object({
    tax_dependent_id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
    year: joi_1.default.number().integer().min(2000).max(2200).required(),
    supported_amount: joi_1.default.number().min(0).allow(null),
    is_supporting_current_year: joi_1.default.boolean().default(false),
    is_confirm: joi_1.default.boolean().default(false),
    expected_support_years: joi_1.default.number().integer().min(0).allow(null),
    notes: joi_1.default.string().allow(null, ''),
    media_path: joi_1.default.string().allow(null, ''),
});
const schema_update_dependent_support_amount = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
    supported_amount: joi_1.default.number().min(0).allow(null),
    is_supporting_current_year: joi_1.default.boolean().default(false),
    expected_support_years: joi_1.default.number().integer().min(0).allow(null),
    notes: joi_1.default.string().allow(null, ''),
    media_path: joi_1.default.string().allow(null, ''),
});
const schema_delete_dependent_support_amount = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().required(),
});
const schema_get_dependent_support_amount_by_tax_dependent_id_and_year = joi_1.default.object({
    tax_dependent_id: joi_1.default.string().guid().required(),
    year: joi_1.default.number().integer().min(2000).max(2200).required(),
});
const validate_create_dependent_support_amount = (data) => {
    return schema_create_dependent_support_amount.validate(data);
};
exports.validate_create_dependent_support_amount = validate_create_dependent_support_amount;
const validate_update_dependent_support_amount = (data) => {
    return schema_update_dependent_support_amount.validate(data);
};
exports.validate_update_dependent_support_amount = validate_update_dependent_support_amount;
const validate_delete_dependent_support_amount = (data) => {
    return schema_delete_dependent_support_amount.validate(data);
};
exports.validate_delete_dependent_support_amount = validate_delete_dependent_support_amount;
const validate_get_dependent_support_amount_by_tax_dependent_id_and_year = (data) => {
    return schema_get_dependent_support_amount_by_tax_dependent_id_and_year.validate(data);
};
exports.validate_get_dependent_support_amount_by_tax_dependent_id_and_year = validate_get_dependent_support_amount_by_tax_dependent_id_and_year;
