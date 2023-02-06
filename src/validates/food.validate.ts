import Joi from '@hapi/joi';

const schema_food_create = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(5).max(255).required(),
    price: Joi.number().integer().min(100).max(10000).required(),
});

const validate_food_create = (data: any) => {
    return schema_food_create.validate(data);
};

export { validate_food_create };
