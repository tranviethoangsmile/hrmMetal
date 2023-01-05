import Joi from '@hapi/joi';

const schema_department_create = Joi.object({
    name: Joi.string().min(2).max(100).required(),
});



const validation_department_create = (data : any) => {
    return schema_department_create.validate(data);
}


export { validation_department_create }
