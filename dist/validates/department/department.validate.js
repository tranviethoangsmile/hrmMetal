"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation_department_create = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_department_create = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
});
const validation_department_create = (data) => {
    return schema_department_create.validate(data);
};
exports.validation_department_create = validation_department_create;
