import Joi from '@hapi/joi';

const schema_create_notification = Joi.object({
    user_id: Joi.string().guid().required(),
    message: Joi.string().required(),
    type: Joi.string().required(),
    is_readed: Joi.boolean(),
    title: Joi.string().required(),
});

const validate_create_notification = (value: any) => {
    return schema_create_notification.validate(value);
};

export { validate_create_notification };
