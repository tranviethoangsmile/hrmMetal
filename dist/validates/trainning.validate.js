"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_schema_search_trainning = exports.validate_schema_trainning = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_trainning = joi_1.default.object({
    trainning_name: joi_1.default.string().required(),
    product_name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    media_path: joi_1.default.array().required(),
    user_id: joi_1.default.string().required(),
});
const schema_search_trainning = joi_1.default.string();
const validate_schema_trainning = (data) => {
    return schema_trainning.validate(data);
};
exports.validate_schema_trainning = validate_schema_trainning;
const validate_schema_search_trainning = (data) => {
    return schema_search_trainning.validate(data);
};
exports.validate_schema_search_trainning = validate_schema_search_trainning;
