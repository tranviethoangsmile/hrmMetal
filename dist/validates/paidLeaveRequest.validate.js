"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update = exports.validate_create = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create = joi_1.default.object({
    date: joi_1.default.string().min(8).max(11).required(),
    reason: joi_1.default.string().required(),
    staff_id: joi_1.default.string().guid().required(),
    leader_id: joi_1.default.string().guid().required(),
});
const validate_create = (data) => {
    return schema_create.validate(data);
};
exports.validate_create = validate_create;
const schema_update = joi_1.default.object({
    user_id: joi_1.default.string().guid(),
    id: joi_1.default.string().guid().required(),
});
const validate_update = (date) => {
    return schema_update.validate(date);
};
exports.validate_update = validate_update;
