import Joi from '@hapi/joi';

const schema_create_uniform_order = Joi.object({
    user_id: Joi.string().guid().required(),
    position: Joi.string().required(),
    date: Joi.string().required(),
    order_status: Joi.string(),
    delivery_date: Joi.string(),
    notes: Joi.string(),
    items: Joi.array()
        .items(
            Joi.object({
                uniform_type: Joi.string().required(),
                uniform_size: Joi.string().required(),
                quantity: Joi.number().required(),
            }),
        )
        .min(1)
        .required(),
});

const schema_search_uniform_order_with_position = Joi.string().required();

const validate_create_uniform_order = (field: any) => {
    return schema_create_uniform_order.validate(field);
};

const validate_position = (position: string) => {
    return schema_search_uniform_order_with_position.validate(position);
};
export { validate_create_uniform_order, validate_position };
