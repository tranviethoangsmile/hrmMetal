import Joi from '@hapi/joi';
const schema_create_order = Joi.object({
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
    dayOrNight: Joi.string().min(3).max(5).required(),
    user_id: Joi.string().guid().required(),
    position: Joi.string().min(3).max(10).required(),
});

const schema_search_order = Joi.object({
    id: Joi.string(),
    user_id: Joi.string(),
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.pattern.base': 'Date must be in the format yyyy-mm-dd',
        }),
    position: Joi.string(),
    canteen_id: Joi.string(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    deleted_at: Joi.date(),
});

const schema_search_order_for_user = Joi.object({
    user_id: Joi.string().required(),
    date: Joi.date().required(),
});

const schema_checkin_picked_order = Joi.object({
    id: Joi.string(),
    user_id: Joi.string().required(),
    date: Joi.string().required(),
});

const validate_create_order = (data: any) => {
    return schema_create_order.validate(data);
};

const validate_search_order = (data: any) => {
    return schema_search_order.validate(data);
};

const validate_search_order_for_user = (data: any) => {
    return schema_search_order_for_user.validate(data);
};
const validate_checkin_picked_order = (data: any) => {
    return schema_checkin_picked_order.validate(data);
};

export {
    validate_create_order,
    validate_search_order,
    validate_search_order_for_user,
    validate_checkin_picked_order,
};
