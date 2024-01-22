"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_search_order_for_user = exports.validate_search_order = exports.validate_create_order = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_order = joi_1.default.object({
    date: joi_1.default.string().min(8).max(12).required(),
    dayOrNight: joi_1.default.string().min(3).max(5).required(),
    user_id: joi_1.default.string().guid().required(),
    position: joi_1.default.string().min(3).max(10).required(),
});
const schema_search_order = joi_1.default.object({
    id: joi_1.default.string(),
    user_id: joi_1.default.string(),
    date: joi_1.default.string(),
    canteen_id: joi_1.default.string(),
    created_at: joi_1.default.date(),
    updated_at: joi_1.default.date(),
    deleted_at: joi_1.default.date(),
});
const schema_search_order_for_user = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
});
const validate_create_order = (data) => {
    return schema_create_order.validate(data);
};
exports.validate_create_order = validate_create_order;
const validate_search_order = (data) => {
    return schema_search_order.validate(data);
};
exports.validate_search_order = validate_search_order;
const validate_search_order_for_user = (data) => {
    return schema_search_order_for_user.validate(data);
};
exports.validate_search_order_for_user = validate_search_order_for_user;
