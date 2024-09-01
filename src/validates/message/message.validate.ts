import Joi from '@hapi/joi';

const schema_message_valid = Joi.object({
    message: Joi.string().max(1000).min(1).required(),
    user_id: Joi.string().guid().required(),
    conversation_id: Joi.string().guid().required(),
});

const create_massage_validate = (data: any) => {
    return schema_message_valid.validate(data);
};

export { create_massage_validate };
