"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_get_by_user_id = exports.validate_confirm_safetyReport = exports.validate_update_safetyReport = exports.validate_create_safetyReport = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_safetyReport = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    content: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    department_id: joi_1.default.string().guid().required(),
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    solution: joi_1.default.string().required(),
    corrective_action: joi_1.default.string().optional().allow('', null),
    media_path: joi_1.default.string().optional().allow('', null),
});
const schema_update_safetyReport = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid().optional().allow('', null),
    content: joi_1.default.string().optional().allow('', null),
    title: joi_1.default.string().optional().allow('', null),
    solution: joi_1.default.string().optional().allow('', null),
    corrective_action: joi_1.default.string().optional().allow('', null),
    leader_id: joi_1.default.string().guid().optional().allow('', null),
});
const schema_confirm_safetyReport = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    leader_id: joi_1.default.string().guid().required(),
    corrective_action: joi_1.default.string().optional().allow('', null),
});
const schema_get_by_user_id = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
});
const validate_create_safetyReport = (value) => {
    return schema_create_safetyReport.validate(value);
};
exports.validate_create_safetyReport = validate_create_safetyReport;
const validate_update_safetyReport = (value) => {
    return schema_update_safetyReport.validate(value);
};
exports.validate_update_safetyReport = validate_update_safetyReport;
const validate_confirm_safetyReport = (value) => {
    return schema_confirm_safetyReport.validate(value);
};
exports.validate_confirm_safetyReport = validate_confirm_safetyReport;
const validate_get_by_user_id = (value) => {
    return schema_get_by_user_id.validate(value);
};
exports.validate_get_by_user_id = validate_get_by_user_id;
