import Joi from '@hapi/joi';
const create_conversation_validate = Joi.object({
    sender_id: Joi.string().guid().required(),
    receiver_id: Joi.string().guid().required(),
});

const create_conversation_group_validate = Joi.object({
    title: Joi.string().required(),
    sender_id: Joi.string().guid().required(),
    receivers: Joi.array()
        .items(
            Joi.object({
                user_id: Joi.string().guid().required(),
            }),
        )
        .min(2)
        .required(),
});

const validate_create_conversation = (field: any) => {
    return create_conversation_validate.validate(field);
};

const validate_create_conversation_group = (field: any) => {
    return create_conversation_group_validate.validate(field);
};

export { validate_create_conversation, validate_create_conversation_group };
