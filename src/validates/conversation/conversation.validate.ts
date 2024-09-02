import Joi from '@hapi/joi';
const create_conversation_validate = Joi.object({
    sender_id: Joi.string().guid().required(),
    receiver_id: Joi.string().guid().required(),
});

const validate_create_conversation = (field: any) => {
    return create_conversation_validate.validate(field);
};

export { validate_create_conversation };
