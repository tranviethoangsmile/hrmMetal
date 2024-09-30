"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update_events = exports.validate_create_events = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_events = joi_1.default.object({
    name: joi_1.default.string().required(),
    is_safety: joi_1.default.boolean().required(),
    is_active: joi_1.default.boolean().required(),
    description: joi_1.default.string().required(),
    date_start: joi_1.default.string().required(),
    date_end: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    media: joi_1.default.string(),
});
const schema_update_events = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    name: joi_1.default.string(),
    is_safety: joi_1.default.boolean(),
    is_active: joi_1.default.boolean(),
});
const validate_create_events = (value) => {
    return schema_create_events.validate(value);
};
exports.validate_create_events = validate_create_events;
const validate_update_events = (value) => {
    return schema_update_events.validate(value);
};
exports.validate_update_events = validate_update_events;
