import Joi from '@hapi/joi';

const schema_create = Joi.object({
    date: Joi.string().min(8).max(11).required(),
    reason: Joi.string().required(),
    staff_id: Joi.string().guid().required(),
    leader_id: Joi.string().guid().required(),
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
