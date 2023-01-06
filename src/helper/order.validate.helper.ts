import Joi from "@hapi/joi";
const schema_create_order = Joi.object({
    user_id: Joi.string().guid().required(),
    food_id: Joi.string().guid().required(),
    canteen_id: Joi.string().guid().required(),
})

const schema_search_order = Joi.object({
    user_id: Joi.string(),
    food_id: Joi.string(),
    canteen_id: Joi.string(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    deleted_at: Joi.date(),
})

const validate_create_order = (data: any ) => {
    return schema_create_order.validate(data)
};

const validate_search_order = (data: any ) => {
    return schema_search_order.validate(data)
}

export { validate_create_order, validate_search_order };