"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation_id = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_id = joi_1.default.string().guid();
const validation_id = (id) => {
    return schema_id.validate(id);
};
exports.validation_id = validation_id;
