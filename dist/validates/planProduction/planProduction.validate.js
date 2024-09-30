"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_search_plan_production_seven_day_of_department = exports.validate_update_plan_production = exports.validate_create_plan_production = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_plan_production = joi_1.default.object({
    department_id: joi_1.default.string().guid().required(),
    date: joi_1.default.string().required(),
    quantity: joi_1.default.number().min(0).max(1000).required(),
    product: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    is_custom: joi_1.default.boolean(),
    operation_time: joi_1.default.number().min(0).max(3).required(),
    work_shift: joi_1.default.string().required(),
    production_line: joi_1.default.string().required(),
});
const schema_update_plan_production = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    date: joi_1.default.string(),
    quantity: joi_1.default.number().min(0).max(1000),
    product: joi_1.default.string(),
    is_custom: joi_1.default.boolean(),
    operation_time: joi_1.default.number().min(0).max(3),
    work_shift: joi_1.default.string(),
    production_line: joi_1.default.string(),
});
const schema_search_plan_production_seven_day_of_department = joi_1.default.object({
    department_id: joi_1.default.string().guid().required(),
    start_date: joi_1.default.string().required(),
    end_date: joi_1.default.string().required(),
});
const validate_create_plan_production = (value) => {
    return schema_create_plan_production.validate(value);
};
exports.validate_create_plan_production = validate_create_plan_production;
const validate_update_plan_production = (value) => {
    return schema_update_plan_production.validate(value);
};
exports.validate_update_plan_production = validate_update_plan_production;
const validate_search_plan_production_seven_day_of_department = (value) => {
    return schema_search_plan_production_seven_day_of_department.validate(value);
};
exports.validate_search_plan_production_seven_day_of_department = validate_search_plan_production_seven_day_of_department;
