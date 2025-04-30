import Joi from '@hapi/joi';

const schema_create_events = Joi.object({
    name: Joi.string().required(),
    is_safety: Joi.boolean().required(),
    is_active: Joi.boolean().required(),
    description: Joi.string().required(),
    date_start: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    date_end: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    position: Joi.string().required(),
    media: Joi.string(),
});
const schema_update_events = Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string(),
    is_safety: Joi.boolean(),
    is_active: Joi.boolean(),
});

const schema_get_events_with_position = Joi.string().required();
const validate_create_events = (value: any) => {
    return schema_create_events.validate(value);
};
const validate_update_events = (value: any) => {
    return schema_update_events.validate(value);
};

const validate_get_event_with_position = (position: string) => {
    return schema_get_events_with_position.validate(position);
};

export {
    validate_create_events,
    validate_update_events,
    validate_get_event_with_position,
};
