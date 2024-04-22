import Joi from '@hapi/joi';

const schema_create_inventory = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
});
const schema_search_with_name = Joi.object({
    product: Joi.string().required(),
});

const schema_update_inventory = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
});
const validate_create_inventory = (field: any) => {
    return schema_create_inventory.validate(field);
};

const validate_search_with_name = (field: any) => {
    return schema_search_with_name.validate(field);
};
const validate_update_inventory = (field: any) => {
    return schema_update_inventory.validate(field);
};

export {
    validate_create_inventory,
    validate_search_with_name,
    validate_update_inventory,
};
