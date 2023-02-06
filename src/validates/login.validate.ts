import Joi from '@hapi/joi';

const schema_login = Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
})

const validate_login = (data: any) => {
    return schema_login.validate(data);
}

export { validate_login };