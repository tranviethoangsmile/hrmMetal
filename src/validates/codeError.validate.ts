import Joi from '@hapi/joi';

const schema_search_error_report = Joi.object({
    code: Joi.string(),
    description: Joi.string(),
    shutdown_time: Joi.number(),
    daily_report_id: Joi.string().guid().required(),
});

const valid_search_err = (data: any) => {
    return schema_search_error_report.validate(data);
};

export { valid_search_err };
