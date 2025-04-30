import Joi, { date } from '@hapi/joi';

const schema_create_day_off = Joi.object({
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    user_id: Joi.string().guid().required(),
});

const schema_update_day_off = Joi.object({
    id: Joi.string().guid().required(),
    date: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    user_id: Joi.string().guid(),
});

const validate_create_day_off = (data: any) => {
    return schema_create_day_off.validate(data);
};

const validate_update_day_off = (data: any) => {
    return schema_update_day_off.validate(data);
};

export { validate_create_day_off, validate_update_day_off };
