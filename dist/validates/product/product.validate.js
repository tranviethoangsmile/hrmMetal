"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid_search_product = exports.valid_create_product = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_product_create = joi_1.default.object({
    name: joi_1.default.string().required(),
    ic_card: joi_1.default.string().required(),
    user_id: joi_1.default.string().guid(),
    shift: joi_1.default.string().max(1).required(),
    date: joi_1.default.date().required(),
    quantity: joi_1.default.number().min(1).max(999).required(),
    day_code: joi_1.default.string().required(),
});
const schema_product_search = joi_1.default.object({
    name: joi_1.default.string(),
    ic_card: joi_1.default.string(),
    user_id: joi_1.default.string().guid(),
    shift: joi_1.default.string().max(1),
    date: joi_1.default.date(),
    quantity: joi_1.default.number().min(1).max(999),
    day_code: joi_1.default.string(),
});
const valid_create_product = (data) => {
    return schema_product_create.validate(data);
};
exports.valid_create_product = valid_create_product;
const valid_search_product = (data) => {
    return schema_product_search.validate(data);
};
exports.valid_search_product = valid_search_product;
