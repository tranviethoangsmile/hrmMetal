import Joi from '@hapi/joi';

const schema_create = Joi.object({
    reason: Joi.string().required(),
    user_id: Joi.string().guid().required(),
    leader_id: Joi.string().guid().required(),
    date_request: Joi.string().min(8).max(11).required(),
    date_leave: Joi.string().min(8).max(11).required(),
    is_paid: Joi.boolean(),
    position: Joi.string().required(),
});

const validate_create = (data: any) => {
    return schema_create.validate(data);
};

const schema_update = Joi.object({
    user_id: Joi.string().guid(),
    id: Joi.string().guid().required(),
});

const validate_update = (date: any) => {
    return schema_update.validate(date);
};
export { validate_create, validate_update };
