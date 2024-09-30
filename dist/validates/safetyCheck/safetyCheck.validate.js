"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_search_safety_checked = exports.validate_create_safety_check = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_safety_check = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    event_id: joi_1.default.string().guid().required(),
    is_safety: joi_1.default.boolean().required(),
    feedback: joi_1.default.string(),
    is_at_home: joi_1.default.boolean().required(),
    is_can_work: joi_1.default.boolean().required(),
});
const schema_search_safety_checked = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    event_id: joi_1.default.string().guid().required(),
});
const validate_create_safety_check = (value) => {
    return schema_create_safety_check.validate(value);
};
exports.validate_create_safety_check = validate_create_safety_check;
const validate_search_safety_checked = (value) => {
    return schema_search_safety_checked.validate(value);
};
exports.validate_search_safety_checked = validate_search_safety_checked;
