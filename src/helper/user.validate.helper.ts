import Joi from '@hapi/joi';

const schema_user_create = Joi.object({
    name: Joi.string().min(5).max(99).required(),
    user_name: Joi.string().min(5).max(99).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(99).required(),
    dob:Joi.date().required(),
    phone: Joi.string().regex(/^[0-9]{10}$/),
    avatar: Joi.string(),
    ic_id: Joi.string(),
    employee_id: Joi.number().integer().min(1000).max(999999).required(),
    is_active: Joi.boolean().default(false),
    is_admin: Joi.boolean().default(false),
    role: Joi.string().default('USER'),
    possition: Joi.string().default('STAFF'),
    department_id: Joi.string().guid(),
});


const schema_user_update = Joi.object({
    id: Joi.string().guid(),
    name: Joi.string().min(5).max(99),
    user_name: Joi.string().min(5).max(99),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(99),
    dob:Joi.date(),
    phone: Joi.string().regex(/^[0-9]{10}$/),
    avatar: Joi.string(),
    ic_id: Joi.string(),
    employee_id: Joi.number().integer().min(1000).max(999999).required(),
    is_active: Joi.boolean().default(false),
    is_admin: Joi.boolean().default(false),
    role: Joi.string().default('USER'),
    possition: Joi.string().default('STAFF'),
    department_id: Joi.string().guid(),
})

const valid_user_create = (data: any) => {
    return schema_user_create.validate(data)
}

const valid_user_update = (data: any) => {
    return schema_user_update.validate(data)
}


export { valid_user_create, valid_user_update };