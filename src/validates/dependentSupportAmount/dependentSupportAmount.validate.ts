import Joi from "@hapi/joi";

const schema_create_dependent_support_amount = Joi.object({
    tax_dependent_id: Joi.string().guid().required(),
    user_id:  Joi.string().guid().required(),
    year: Joi.number().integer().min(2000).max(2200).required(),
    supported_amount: Joi.number().min(0).allow(null),
    is_supporting_current_year: Joi.boolean().default(false),
    is_confirm: Joi.boolean().default(false),
    expected_support_years: Joi.number().integer().min(0).allow(null),
    notes: Joi.string().allow(null,''),
    media_path: Joi.string().allow(null,''),
})

const schema_update_dependent_support_amount = Joi.object({
    id:  Joi.string().guid().required(),
    user_id:  Joi.string().guid().required(),
    supported_amount: Joi.number().min(0).allow(null),
    is_supporting_current_year: Joi.boolean().default(false),
    expected_support_years: Joi.number().integer().min(0).allow(null),
    notes: Joi.string().allow(null,''),
    media_path: Joi.string().allow(null,''),
})

const schema_delete_dependent_support_amount = Joi.object({
    id:  Joi.string().guid().required(),
    user_id:  Joi.string().guid().required(),
})

const validate_create_dependent_support_amount = (data: any) =>{
    return schema_create_dependent_support_amount.validate(data);
}

const validate_update_dependent_support_amount = (data: any) =>{
    return schema_update_dependent_support_amount.validate(data);
}
const validate_delete_dependent_support_amount = (data: any) =>{
    return schema_delete_dependent_support_amount.validate(data);
}

export {validate_create_dependent_support_amount, validate_update_dependent_support_amount, validate_delete_dependent_support_amount}