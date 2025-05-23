import Joi from '@hapi/joi';

const create_overtime_request_schema = Joi.object({
    user_id: Joi.string().guid().required(),
    department_id: Joi.string().guid().required(),
    leader_id: Joi.string().guid().required(),
    admin_id: Joi.string().guid().allow(null),
    position: Joi.string().required(),
    date: Joi.date().required(),
    overtime_hours: Joi.number().min(1).required(),
    description: Joi.string().required(),
    is_confirm: Joi.boolean().default(false),
    is_approved: Joi.boolean().default(false),
});
const validate_create_overtime_request = (data: any) => {
    return create_overtime_request_schema.validate(data);
};
const update_is_confirm_overtime_request_schema = Joi.object({
    id: Joi.string().guid().required(),
    user_id: Joi.string().guid().required(),
});

const validate_update_is_confirm_overtime_request = (data: any) => {
    return update_is_confirm_overtime_request_schema.validate(data);
};

const delete_overtime_request_schema = Joi.object({
    id: Joi.string().guid().required(),
    user_id: Joi.string().guid().required(),
});

const validate_delete_overtime_request = (data: any) => {
    return delete_overtime_request_schema.validate(data);
};

export {
    validate_create_overtime_request,
    validate_update_is_confirm_overtime_request,
    validate_delete_overtime_request,
};
