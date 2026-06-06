"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid_search_daily_report = exports.valid_create_daily_report = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schame_create_daily_report = joi_1.default.object({
    product: joi_1.default.string().required(),
    user_id: joi_1.default.string().guid().required(),
    department_id: joi_1.default.string().guid().required(),
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    shift: joi_1.default.string().length(1).required(),
    quantity: joi_1.default.number().min(0).max(999).required(),
    good_quantity: joi_1.default.number().min(0).max(999).required(),
    defective_quantity: joi_1.default.number().min(0).max(999).required(),
    cycle_time: joi_1.default.number().min(0).max(999).required(),
    operated_time: joi_1.default.number().min(0).max(999).required(),
    shutdown_time: joi_1.default.number().min(0).max(999).required(),
    operator_history: joi_1.default.string().required(),
    errors: joi_1.default.array()
        .items(joi_1.default.object({
        code: joi_1.default.string().max(50).required(),
        description: joi_1.default.string().required(),
        shutdown_time: joi_1.default.number().min(0).required(),
        error_date: joi_1.default.date().iso().required().messages({
            'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
        }),
    }))
        .default([]),
}).custom((value, helpers) => {
    var _a;
    if (!((_a = value === null || value === void 0 ? void 0 : value.errors) === null || _a === void 0 ? void 0 : _a.length)) {
        return value;
    }
    const reportDate = new Date(value.date).toISOString().slice(0, 10);
    const invalidErrorDate = value.errors.find((item) => new Date(item.error_date).toISOString().slice(0, 10) !== reportDate);
    if (invalidErrorDate) {
        return helpers.error('any.invalid');
    }
    return value;
}).messages({
    'any.invalid': 'error_date must be the same as date',
});
const schame_search_daily_report = joi_1.default.object({
    product: joi_1.default.string().allow(''),
    user_id: joi_1.default.string(),
    department_id: joi_1.default.string().guid().required(),
    date: joi_1.default.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    shift: joi_1.default.string().allow(''),
});
const valid_create_daily_report = (data) => {
    return schame_create_daily_report.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });
};
exports.valid_create_daily_report = valid_create_daily_report;
const valid_search_daily_report = (data) => {
    return schame_search_daily_report.validate(data);
};
exports.valid_search_daily_report = valid_search_daily_report;
