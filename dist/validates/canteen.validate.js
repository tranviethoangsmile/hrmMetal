"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_update_canteen = exports.validate_create_canteen = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_canteen = joi_1.default.object({
    factory_name: joi_1.default.string().min(10).max(255).required(),
    description: joi_1.default.string().min(10).max(255).required(),
});
const validate_create_canteen = (data) => {
    return schema_create_canteen.validate(data);
};
exports.validate_create_canteen = validate_create_canteen;
const schema_update_canteen = joi_1.default.object({
    factory_name: joi_1.default.string().min(10).max(255),
    description: joi_1.default.string().min(10).max(255),
});
const validate_update_canteen = (data) => {
    return schema_update_canteen.validate(data);
};
exports.validate_update_canteen = validate_update_canteen;
