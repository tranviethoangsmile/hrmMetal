import Joi from '@hapi/joi';

const schema_user_create = Joi.object({
    name: Joi.string().min(5).max(99).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(99).required(),
    dob:Joi.date().required(),
    phone: Joi.string().min(10).max(11),
    avatar: Joi.string(),
    employee_id: Joi.number().required(),
    is_active: Joi.boolean().default(false),
    is_admin: Joi.boolean().default(false),
    role: Joi.string().default('USER'),
    possition: Joi.string().default('STAFF'),
    department_id: Joi.string().guid(),
});

const valid_user_create = (data: any) => {
    return schema_user_create.validate(data)
}


export { valid_user_create };