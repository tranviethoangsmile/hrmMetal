import Joi from '@hapi/joi';

const schema_create_payroll = Joi.object({
    user_id: Joi.string().guid().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    pay_date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    work_time: Joi.number().min(0).max(248),
    over_time: Joi.number().min(0).max(728),
    paid_vacation_days: Joi.number().min(0).max(31),
    weekend_time: Joi.number().min(0).max(11),
    paid_vacation_pay: Joi.number().min(0).max(999999),
    work_salary: Joi.number().min(0).max(9999999),
    shift_night_salary: Joi.number().min(0).max(9999999),
    over_time_salary: Joi.number().min(0).max(9999999),
    refund_money: Joi.number().min(0).max(9999999),
    other_pay: Joi.number().min(0).max(9999999),
    weekend_salary: Joi.number().min(0).max(9999999),
    attendance_allowance_pay: Joi.number().min(0).max(9999999),
    travel_allowance_pay: Joi.number().min(0).max(9999999),
    bonus_pay: Joi.number().min(0).max(9999999),
    gross_salary: Joi.number().min(0).max(9999999).required(),
    income_tax: Joi.number().min(0).max(9999999),
    social_insurance: Joi.number().min(0).max(9999999),
    health_insurance: Joi.number().min(0).max(9999999),
    uniform_deduction: Joi.number().min(0).max(9999999),
    accident_insurance: Joi.number().min(0).max(9999999),
    club_fee: Joi.number().min(0).max(9999999),
    rent_home: Joi.number().min(0).max(9999999),
    cost_of_living: Joi.number().min(0).max(9999999),
    other_deduction: Joi.number().min(0).max(9999999),
    shift_night: Joi.number().min(0).max(9999999),
    net_salary: Joi.number().min(0).max(9999999).required(),
    is_active: Joi.boolean().default(false),
});

const schema_search_payroll_of_user = Joi.object({
    user_id: Joi.string().guid().required(),
    date: Joi.string().required(),
});

const schema_update_payroll = Joi.object({
    id: Joi.string().guid().required(),
    user_id: Joi.string().guid(),
    date: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    pay_date: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    work_time: Joi.number().min(0).max(248),
    over_time: Joi.number().min(0).max(728),
    paid_vacation_days: Joi.number().min(0).max(31),
    weekend_time: Joi.number().min(0).max(11),
    paid_vacation_pay: Joi.number().min(0).max(999999),
    work_salary: Joi.number().min(0).max(9999999),
    shift_night_salary: Joi.number().min(0).max(9999999),
    over_time_salary: Joi.number().min(0).max(9999999),
    refund_money: Joi.number().min(0).max(9999999),
    other_pay: Joi.number().min(0).max(9999999),
    weekend_salary: Joi.number().min(0).max(9999999),
    attendance_allowance_pay: Joi.number().min(0).max(9999999),
    travel_allowance_pay: Joi.number().min(0).max(9999999),
    bonus_pay: Joi.number().min(0).max(9999999),
    gross_salary: Joi.number().min(0).max(9999999),
    income_tax: Joi.number().min(0).max(9999999),
    social_insurance: Joi.number().min(0).max(9999999),
    health_insurance: Joi.number().min(0).max(9999999),
    uniform_deduction: Joi.number().min(0).max(9999999),
    accident_insurance: Joi.number().min(0).max(9999999),
    club_fee: Joi.number().min(0).max(9999999),
    rent_home: Joi.number().min(0).max(9999999),
    cost_of_living: Joi.number().min(0).max(9999999),
    other_deduction: Joi.number().min(0).max(9999999),
    shift_night: Joi.number().min(0).max(9999999),
    net_salary: Joi.number().min(0).max(9999999),
    is_active: Joi.boolean(),
});

const validate_create_payroll = (value: any) => {
    return schema_create_payroll.validate(value);
};
const validate_update_payroll = (value: any) => {
    return schema_update_payroll.validate(value);
};

const validate_search_payroll = (value: any) => {
    return schema_search_payroll_of_user.validate(value);
};

export {
    validate_create_payroll,
    validate_update_payroll,
    validate_search_payroll,
};
