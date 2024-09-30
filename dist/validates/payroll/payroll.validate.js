"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_search_payroll = exports.validate_update_payroll = exports.validate_create_payroll = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_create_payroll = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    date: joi_1.default.string().required(),
    pay_date: joi_1.default.string().required(),
    work_time: joi_1.default.number().min(0).max(248),
    over_time: joi_1.default.number().min(0).max(728),
    paid_vacation_days: joi_1.default.number().min(0).max(31),
    weekend_time: joi_1.default.number().min(0).max(11),
    paid_vacation_pay: joi_1.default.number().min(0).max(999999),
    work_salary: joi_1.default.number().min(0).max(9999999),
    shift_night_salary: joi_1.default.number().min(0).max(9999999),
    over_time_salary: joi_1.default.number().min(0).max(9999999),
    refund_money: joi_1.default.number().min(0).max(9999999),
    other_pay: joi_1.default.number().min(0).max(9999999),
    weekend_salary: joi_1.default.number().min(0).max(9999999),
    attendance_allowance_pay: joi_1.default.number().min(0).max(9999999),
    travel_allowance_pay: joi_1.default.number().min(0).max(9999999),
    bonus_pay: joi_1.default.number().min(0).max(9999999),
    gross_salary: joi_1.default.number().min(0).max(9999999).required(),
    income_tax: joi_1.default.number().min(0).max(9999999),
    social_insurance: joi_1.default.number().min(0).max(9999999),
    health_insurance: joi_1.default.number().min(0).max(9999999),
    uniform_deduction: joi_1.default.number().min(0).max(9999999),
    accident_insurance: joi_1.default.number().min(0).max(9999999),
    club_fee: joi_1.default.number().min(0).max(9999999),
    rent_home: joi_1.default.number().min(0).max(9999999),
    cost_of_living: joi_1.default.number().min(0).max(9999999),
    other_deduction: joi_1.default.number().min(0).max(9999999),
    shift_night: joi_1.default.number().min(0).max(9999999),
    net_salary: joi_1.default.number().min(0).max(9999999).required(),
    is_active: joi_1.default.boolean().default(false),
});
const schema_search_payroll_of_user = joi_1.default.object({
    user_id: joi_1.default.string().guid().required(),
    date: joi_1.default.string().required(),
});
const schema_update_payroll = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    user_id: joi_1.default.string().guid(),
    date: joi_1.default.string(),
    pay_date: joi_1.default.string(),
    work_time: joi_1.default.number().min(0).max(248),
    over_time: joi_1.default.number().min(0).max(728),
    paid_vacation_days: joi_1.default.number().min(0).max(31),
    weekend_time: joi_1.default.number().min(0).max(11),
    paid_vacation_pay: joi_1.default.number().min(0).max(999999),
    work_salary: joi_1.default.number().min(0).max(9999999),
    shift_night_salary: joi_1.default.number().min(0).max(9999999),
    over_time_salary: joi_1.default.number().min(0).max(9999999),
    refund_money: joi_1.default.number().min(0).max(9999999),
    other_pay: joi_1.default.number().min(0).max(9999999),
    weekend_salary: joi_1.default.number().min(0).max(9999999),
    attendance_allowance_pay: joi_1.default.number().min(0).max(9999999),
    travel_allowance_pay: joi_1.default.number().min(0).max(9999999),
    bonus_pay: joi_1.default.number().min(0).max(9999999),
    gross_salary: joi_1.default.number().min(0).max(9999999),
    income_tax: joi_1.default.number().min(0).max(9999999),
    social_insurance: joi_1.default.number().min(0).max(9999999),
    health_insurance: joi_1.default.number().min(0).max(9999999),
    uniform_deduction: joi_1.default.number().min(0).max(9999999),
    accident_insurance: joi_1.default.number().min(0).max(9999999),
    club_fee: joi_1.default.number().min(0).max(9999999),
    rent_home: joi_1.default.number().min(0).max(9999999),
    cost_of_living: joi_1.default.number().min(0).max(9999999),
    other_deduction: joi_1.default.number().min(0).max(9999999),
    shift_night: joi_1.default.number().min(0).max(9999999),
    net_salary: joi_1.default.number().min(0).max(9999999),
    is_active: joi_1.default.boolean(),
});
const validate_create_payroll = (value) => {
    return schema_create_payroll.validate(value);
};
exports.validate_create_payroll = validate_create_payroll;
const validate_update_payroll = (value) => {
    return schema_update_payroll.validate(value);
};
exports.validate_update_payroll = validate_update_payroll;
const validate_search_payroll = (value) => {
    return schema_search_payroll_of_user.validate(value);
};
exports.validate_search_payroll = validate_search_payroll;
