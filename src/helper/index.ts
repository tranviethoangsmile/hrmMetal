import Joi  from '@hapi/joi'


const schema_id = Joi.string().guid();

const validation_id = (id : string) => {
    return schema_id.validate(id);
}

export { validation_id }