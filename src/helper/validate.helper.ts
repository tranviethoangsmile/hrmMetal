import Joi from '@hapi/joi';

const schema_department_create = Joi.object({
    name: Joi.string().min(5).max(100).required(),
});

const schema_department_find_by_id = Joi.string().guid();

const validation_department_create = (data : any) => {
    return schema_department_create.validate(data);
}

const validation_department_find_by_id = (data : string) => {
    return schema_department_find_by_id.validate(data);
}

export { validation_department_create, validation_department_find_by_id }
