import Joi from '@hapi/joi';

const schame_create_daily_report = Joi.object({
    product: Joi.string().required(),
    user_id: Joi.string().guid().required(),
    department_id: Joi.string().guid().required(),
    date: Joi.date().required(),
    shift: Joi.string().length(1).required(),
    quantity: Joi.number().min(0).max(999).required(),
    operated_time: Joi.number().min(0).max(999).required(),
    shutdown_time: Joi.number().min(0).max(999).required(),
    operator_history: Joi.string().required(),
});

const schame_search_daily_report = Joi.object({
    product: Joi.string().allow(''),
    user_id: Joi.string(),
    department_id: Joi.string().guid().required(),
    date: Joi.date(),
    shift: Joi.string().allow(''),
});

const valid_create_daily_report = (data: any) => {
    return schame_create_daily_report.validate(data);
};

const valid_search_daily_report = (data: any) => {
    return schame_search_daily_report.validate(data);
};

export { valid_create_daily_report, valid_search_daily_report };
