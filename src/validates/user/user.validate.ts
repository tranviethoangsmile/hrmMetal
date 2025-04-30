import Joi from '@hapi/joi';

const schema_user_create = Joi.object({
    name: Joi.string().min(5).max(99).required(),
    user_name: Joi.string().min(5).max(99).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(99).required(),
    dob: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    phone: Joi.string().regex(/^[0-9]{10}$/),
    avatar: Joi.string(),
    ic_id: Joi.string(),
    employee_id: Joi.number().integer().min(1000).max(999999).required(),
    is_active: Joi.boolean().default(false),
    is_admin: Joi.boolean().default(false),
    is_officer: Joi.boolean().default(false),
    role: Joi.string().required(),
    position: Joi.string().required(),
    department_id: Joi.string().guid(),
    begin_date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    is_offical_staff: Joi.boolean().default(false),
    salary_hourly: Joi.number().integer().min(100).max(999999),
    shift_night_pay: Joi.number().integer().min(100).max(999999),
    travel_allowance_pay: Joi.number().integer().min(100).max(999999),
    paid_days: Joi.number().min(0).max(999999),
});

const schema_user_update = Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string().min(5).max(99),
    user_name: Joi.string().min(5).max(99),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(99),
    dob: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    phone: Joi.string().regex(/^[0-9]{10}$/),
    avatar: Joi.string(),
    ic_id: Joi.string(),
    employee_id: Joi.number().integer().min(1000).max(999999),
    is_active: Joi.boolean().default(false),
    is_admin: Joi.boolean().default(false),
    is_officer: Joi.boolean().default(false),
    role: Joi.string(),
    position: Joi.string(),
    department_id: Joi.string().guid(),
    begin_date: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    is_offical_staff: Joi.boolean().default(false),
    salary_hourly: Joi.number().integer().min(100).max(999999),
    shift_night_pay: Joi.number().integer().min(100).max(999999),
    travel_allowance_pay: Joi.number().integer().min(100).max(999999),
    paid_days: Joi.number().min(0).max(999999),
});

const schema_user_find_all_with_field = Joi.object({
    position: Joi.string(),
});

const schema_find_by_name = Joi.string().min(1).max(99).required();

const valid_user_create = (data: any) => {
    return schema_user_create.validate(data);
};

const valid_user_update = (data: any) => {
    return schema_user_update.validate(data);
};
const valid_user_find_all_with_field = (data: any) => {
    return schema_user_find_all_with_field.validate(data);
};

const valid_find_by_name = (name: string) => {
    return schema_find_by_name.validate(name);
};

export {
    valid_user_create,
    valid_user_update,
    valid_user_find_all_with_field,
    valid_find_by_name,
};
