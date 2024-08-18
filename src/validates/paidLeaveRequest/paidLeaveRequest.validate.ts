import Joi from '@hapi/joi';

const schema_create = Joi.object({
    reason: Joi.string().required(),
    user_id: Joi.string().guid().required(),
    leader_id: Joi.string().guid().required(),
    date_request: Joi.string().min(8).max(11).required(),
    date_leave: Joi.string().min(8).max(11).required(),
    is_paid: Joi.boolean(),
    position: Joi.string().required(),
    is_half: Joi.boolean().required(),
});

const validate_create_paid = (data: any) => {
    return schema_create.validate(data);
};

const schema_update = Joi.object({
    user_id: Joi.string().guid(),
    feedback: Joi.string(),
    is_confirm: Joi.boolean(),
    admin_id: Joi.string(),
    id: Joi.string().guid().required(),
});

const validate_update_paid = (date: any) => {
    return schema_update.validate(date);
};

const schema_search_leave_request_with_field = Joi.object({
    user_id: Joi.string().guid(),
    leader_id: Joi.string().guid(),
    date_request: Joi.string().min(8).max(11),
    date_leave: Joi.string().min(8).max(11),
    position: Joi.string(),
    is_confirm: Joi.boolean(),
    is_approve: Joi.boolean(),
});
const validate_search_paid = (data: any) => {
    return schema_search_leave_request_with_field.validate(data);
};
export { validate_create_paid, validate_update_paid, validate_search_paid };
