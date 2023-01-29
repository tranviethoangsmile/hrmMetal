import Joi, { valid } from "@hapi/joi";


const schema_product_create = Joi.object({
    name : Joi.string().required(),
    ic_card :  Joi.string().required(),
    user_id: Joi.string().guid(),
    shift: Joi.string().max(1).required(),
    date: Joi.date().required(),
    quantity: Joi.number().min(1).max(999).required(),
    day_code: Joi.string().required(),
})

const schema_product_search = Joi.object({
    name : Joi.string(),
    ic_card :  Joi.string(),
    user_id: Joi.string().guid(),
    shift: Joi.string().max(1),
    date: Joi.date(),
    quantity: Joi.number().min(1).max(999),
    day_code: Joi.string(),
})

const valid_create_product = (data : any) => {
    return schema_product_create.validate(data)
}

const valid_search_product = (data : any) => {
    return schema_product_search.validate(data)
}

export { valid_create_product, valid_search_product }