import Joi from '@hapi/joi';

const schema_create_inventory = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
});

const validate_create_inventory = (field: any) => {
    return schema_create_inventory.validate(field);
};

export { validate_create_inventory };
