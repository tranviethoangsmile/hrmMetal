import Joi from '@hapi/joi';

const schema_create_safety_check = Joi.object({
    user_id: Joi.string().guid().required(),
    event_id: Joi.string().guid().required(),
    is_safety: Joi.boolean().required(),
    feedback: Joi.string(),
    is_at_home: Joi.boolean().required(),
    is_can_work: Joi.boolean().required(),
});
const schema_search_safety_checked = Joi.object({
    user_id: Joi.string().guid().required(),
    event_id: Joi.string().guid().required(),
});
const validate_create_safety_check = (value: any) => {
    return schema_create_safety_check.validate(value);
};

const validate_search_safety_checked = (value: any) => {
    return schema_search_safety_checked.validate(value);
};

export { validate_create_safety_check, validate_search_safety_checked };
