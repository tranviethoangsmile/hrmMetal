import Joi from '@hapi/joi';

const schema_message_valid = Joi.object({
    message: Joi.string().min(1).max(1000).required(),
    user_id: Joi.string().guid().required(),
    conversation_id: Joi.string().guid().required(),
    message_type: Joi.string().required(),
});

const create_massage_validate = (data: any) => {
    return schema_message_valid.validate(data);
};

export { create_massage_validate };
