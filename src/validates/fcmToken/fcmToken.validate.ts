import Joi from '@hapi/joi';

const schema_create_fcmToken = Joi.object({
    user_id: Joi.string().guid().required(),
    fcm_token: Joi.string().required(),
    device_type: Joi.string().required(),
    app_version: Joi.string().required(),
    device_id: Joi.string().required(),
});

const validate_create_fcm_token = (field: any) => {
    return schema_create_fcmToken.validate(field);
};

export { validate_create_fcm_token };
