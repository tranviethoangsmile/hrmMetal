import Joi from '@hapi/joi';

const schema_create_events = Joi.object({
    name: Joi.string().required(),
    is_safety: Joi.boolean().required(),
    is_active: Joi.boolean().required(),
    description: Joi.string().required(),
    date_start: Joi.string().required(),
    date_end: Joi.string().required(),
    position: Joi.string().required(),
    media: Joi.string(),
});
const schema_update_events = Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string(),
    is_safety: Joi.boolean(),
    is_active: Joi.boolean(),
});

const validate_create_events = (value: any) => {
    return schema_create_events.validate(value);
};
const validate_update_events = (value: any) => {
    return schema_update_events.validate(value);
};

export { validate_create_events, validate_update_events };
