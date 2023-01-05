import Joi  from '@hapi/joi'


const schema_id = Joi.string().guid();

const validation_id = (data : string) => {
    return schema_id.validate(data);
}

export { validation_id }