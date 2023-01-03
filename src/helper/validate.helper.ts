import Joi from '@hapi/joi';

const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
});

export const validation = (data : any) => {
    return schema.validate(data);
}
