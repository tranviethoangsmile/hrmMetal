"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_login = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_login = joi_1.default.object({
    user_name: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
const validate_login = (data) => {
    return schema_login.validate(data);
};
exports.validate_login = validate_login;
