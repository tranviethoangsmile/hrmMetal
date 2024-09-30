"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_search_all_information = exports.validate_create_information = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_infomation_validate = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
    position: joi_1.default.string(),
    media: joi_1.default.string(),
    is_video: joi_1.default.boolean(),
    is_public: joi_1.default.boolean(),
    is_event: joi_1.default.boolean(),
});
const schema_search_all_information_validate = joi_1.default.object({
    user_id: joi_1.default.string(),
    title: joi_1.default.string(),
    content: joi_1.default.string(),
    date: joi_1.default.string(),
    position: joi_1.default.string().required(),
    media: joi_1.default.string(),
    is_video: joi_1.default.boolean(),
    is_public: joi_1.default.boolean(),
    is_check_safety: joi_1.default.boolean(),
});
const validate_create_information = (value) => {
    return schema_create_infomation_validate.validate(value);
};
exports.validate_create_information = validate_create_information;
const validate_search_all_information = (value) => {
    return schema_search_all_information_validate.validate(value);
};
exports.validate_search_all_information = validate_search_all_information;
