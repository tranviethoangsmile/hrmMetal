import Joi from "@hapi/joi";
const schema_create_order = Joi.object({
    user_id: Joi.string().guid().required(),
    food_id: Joi.string().guid().required(),
    canteen_id: Joi.string().guid().required(),
})

const validate_create_order = (data: any ) => {
    return schema_create_order.validate(data)
};

export { validate_create_order };