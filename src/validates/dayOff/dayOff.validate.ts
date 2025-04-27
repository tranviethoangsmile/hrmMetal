import Joi, { date } from '@hapi/joi';

const schema_create_day_off = Joi.object({
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
    user_id: Joi.string().guid().required(),
});

const validate_create_day_off = (data: any) => {
    return schema_create_day_off.validate(data);
};

export { validate_create_day_off };
