import Joi from '@hapi/joi';

const schema_create_event_check = Joi.object({
    user_id: Joi.string().guid().required(),
    event_id: Joi.string().guid().required(),
    is_confirm: Joi.boolean().required(),
});
const schema_search_event_check = Joi.object({
    user_id: Joi.string().guid().required(),
    event_id: Joi.string().guid().required(),
});
const validate_create_event_check = (value: any) => {
    return schema_create_event_check.validate(value);
};

const validate_search_event_checked = (value: any) => {
    return schema_search_event_check.validate(value);
};

export { validate_create_event_check, validate_search_event_checked };
