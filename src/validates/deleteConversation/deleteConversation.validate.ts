import Joi from '@hapi/joi';

const schema_delete_conversation = Joi.object({
    conversation_id: Joi.string().guid().required(),
    user_id: Joi.string().guid().required(),
});

const validate_create_delete_conversation = (field: any) => {
    return schema_delete_conversation.validate(field);
};

export default validate_create_delete_conversation;
