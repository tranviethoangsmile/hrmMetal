"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_food_create = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_food_create = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().min(5).max(255).required(),
    price: joi_1.default.number().integer().min(100).max(10000).required(),
});
const validate_food_create = (data) => {
    return schema_food_create.validate(data);
};
exports.validate_food_create = validate_food_create;
