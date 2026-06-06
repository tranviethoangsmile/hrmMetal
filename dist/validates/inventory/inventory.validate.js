"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update_inventory = exports.validate_search_with_name = exports.validate_create_inventory = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_inventory = joi_1.default.object({
    product: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    department_id: joi_1.default.string().guid().required(),
});
const schema_search_with_name = joi_1.default.object({
    product: joi_1.default.string(),
    department_id: joi_1.default.string().guid(),
});
const schema_update_inventory = joi_1.default.object({
    product: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    department_id: joi_1.default.string().guid(),
});
const validate_create_inventory = (field) => {
    return schema_create_inventory.validate(field);
};
exports.validate_create_inventory = validate_create_inventory;
const validate_search_with_name = (field) => {
    return schema_search_with_name.validate(field);
};
exports.validate_search_with_name = validate_search_with_name;
const validate_update_inventory = (field) => {
    return schema_update_inventory.validate(field);
};
exports.validate_update_inventory = validate_update_inventory;
