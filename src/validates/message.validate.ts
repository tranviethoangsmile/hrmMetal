import Joi from '@hapi/joi';

const schema_message_valid = Joi.object({
    content: Joi.string().max(1000).min(1).required(),
    sender_id: Joi.string().guid().required(),
    conversation_id: Joi.string().guid().required(),
});

const create_massage_validate = (data: any) => {
    return schema_message_valid.validate(data);
};

export { create_massage_validate };
