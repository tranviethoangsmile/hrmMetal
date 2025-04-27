import Joi from '@hapi/joi';

const schema_create_plan_production = Joi.object({
    department_id: Joi.string().guid().required(),
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
    quantity: Joi.number().min(0).max(1000).required(),
    product: Joi.string().required(),
    position: Joi.string().required(),
    is_custom: Joi.boolean(),
    operation_time: Joi.number().min(0).max(3).required(),
    work_shift: Joi.string().required(),
    production_line: Joi.string().required(),
});

const schema_update_plan_production = Joi.object({
    id: Joi.string().guid().required(),
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
    quantity: Joi.number().min(0).max(1000),
    product: Joi.string(),
    is_custom: Joi.boolean(),
    operation_time: Joi.number().min(0).max(3),
    work_shift: Joi.string(),
    production_line: Joi.string(),
});

const schema_search_plan_production_seven_day_of_department = Joi.object({
    department_id: Joi.string().guid().required(),
    start_date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
    end_date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
});

const validate_create_plan_production = (value: any) => {
    return schema_create_plan_production.validate(value);
};

const validate_update_plan_production = (value: any) => {
    return schema_update_plan_production.validate(value);
};

const validate_search_plan_production_seven_day_of_department = (
    value: any,
) => {
    return schema_search_plan_production_seven_day_of_department.validate(
        value,
    );
};

export {
    validate_create_plan_production,
    validate_update_plan_production,
    validate_search_plan_production_seven_day_of_department,
};
