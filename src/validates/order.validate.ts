import Joi from "@hapi/joi";
const schema_create_order = Joi.object({
    date: Joi.string().min(8).max(11).required(),
    user_id: Joi.string().guid().required(),
    food_id: Joi.string().guid().required(),
    canteen_id: Joi.string().guid().required(),
})

const schema_search_order = Joi.object({
    id: Joi.string(),
    user_id: Joi.string(),
    date: Joi.string(),
    food_id: Joi.string(),
    canteen_id: Joi.string(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    deleted_at: Joi.date(),
});

const schema_search_order_for_user = Joi.object({
    user_id: Joi.string().required(),
    date: Joi.date().required()
})

const validate_create_order = (data: any ) => {
    return schema_create_order.validate(data)
};

const validate_search_order = (data: any ) => {
    return schema_search_order.validate(data)
}

const validate_search_order_for_user = (data: any) => {
    return schema_search_order_for_user.validate(data);
}

export { validate_create_order, validate_search_order, validate_search_order_for_user };