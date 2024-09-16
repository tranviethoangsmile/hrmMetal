import Joi from '@hapi/joi';

const schema_delete_message = Joi.object({
    message_id: Joi.string().guid().required(),
    user_id: Joi.string().guid().required(),
});

const validate_create_delete_message = (field: any) => {
    return schema_delete_message.validate(field);
};

export default validate_create_delete_message;
