"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update_day_off = exports.validate_create_day_off = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_day_off = joi_1.default.object({
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    user_id: joi_1.default.string().guid().required(),
});
const schema_update_day_off = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    date: joi_1.default.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    user_id: joi_1.default.string().guid(),
});
const validate_create_day_off = (data) => {
    return schema_create_day_off.validate(data);
};
exports.validate_create_day_off = validate_create_day_off;
const validate_update_day_off = (data) => {
    return schema_update_day_off.validate(data);
};
exports.validate_update_day_off = validate_update_day_off;
