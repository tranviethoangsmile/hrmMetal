import Joi from '@hapi/joi';

const schema_trainning = Joi.object({
    trainning_name: Joi.string().required(),
    product_name: Joi.string().required(),
    description: Joi.string().required(),
    media_path: Joi.array().required(),
    user_id: Joi.string().required(),
});

const validate_schema_trainning = (data: any) => {
    return schema_trainning.validate(data);
};

export { validate_schema_trainning };
