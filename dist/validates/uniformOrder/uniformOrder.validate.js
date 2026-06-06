"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_seach_order_processing = exports.validate_update_uniform_order = exports.validate_position = exports.validate_create_uniform_order = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_uniform_order = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    position: joi_1.default.string().required(),
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    order_status: joi_1.default.string().default('pending'),
    delivery_date: joi_1.default.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    notes: joi_1.default.string().allow(''),
    items: joi_1.default.array()
        .items(joi_1.default.object({
        uniform_type: joi_1.default.string().required(),
        uniform_size: joi_1.default.string().required(),
        quantity: joi_1.default.number().required(),
    }))
        .min(1)
        .required(),
});
const schema_search_with_id_and_status = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    order_status: joi_1.default.string().required(),
});
const schema_search_uniform_order_with_position = joi_1.default.string().required();
const schema_update_uniform_order = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    order_status: joi_1.default.string(),
    delivery_date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    uniform_size: joi_1.default.string(),
    quantity: joi_1.default.number(),
    notes: joi_1.default.string(),
});
const validate_create_uniform_order = (field) => {
    return schema_create_uniform_order.validate(field);
};
exports.validate_create_uniform_order = validate_create_uniform_order;
const validate_position = (position) => {
    return schema_search_uniform_order_with_position.validate(position);
};
exports.validate_position = validate_position;
const validate_update_uniform_order = (field) => {
    return schema_update_uniform_order.validate(field);
};
exports.validate_update_uniform_order = validate_update_uniform_order;
const validate_seach_order_processing = (field) => {
    return schema_search_with_id_and_status.validate(field);
};
exports.validate_seach_order_processing = validate_seach_order_processing;
