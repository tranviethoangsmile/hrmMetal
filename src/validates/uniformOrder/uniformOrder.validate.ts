import Joi from '@hapi/joi';

const schema_create_uniform_order = Joi.object({
    user_id: Joi.string().guid().required(),
    position: Joi.string().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    order_status: Joi.string(),
    delivery_date: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    notes: Joi.string().allow(''),
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

const schema_search_with_id_and_status = Joi.object({
    user_id: Joi.string().guid().required(),
    order_status: Joi.string().required(),
});

const schema_search_uniform_order_with_position = Joi.string().required();

const schema_update_uniform_order = Joi.object({
    id: Joi.string().guid().required(),
    order_status: Joi.string(),
    delivery_date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    uniform_size: Joi.string(),
    quantity: Joi.number(),
    notes: Joi.string(),
});

const validate_create_uniform_order = (field: any) => {
    return schema_create_uniform_order.validate(field);
};

const validate_position = (position: string) => {
    return schema_search_uniform_order_with_position.validate(position);
};

const validate_update_uniform_order = (field: any) => {
    return schema_update_uniform_order.validate(field);
};

const validate_seach_order_processing = (field: any) => {
    return schema_search_with_id_and_status.validate(field);
};
export {
    validate_create_uniform_order,
    validate_position,
    validate_update_uniform_order,
    validate_seach_order_processing,
};
