import Joi from "@hapi/joi";

const schema_create_dependent_support_amount = Joi.object({
    tax_dependent_id: Joi.string().guid().required(),
    year: Joi.number().required(),
    supported_amount: Joi.number().allow(null,''),
    is_supporting_current_year: Joi.boolean().default(false),
    expected_support_years: Joi.number().allow(null,''),
    notes: Joi.string().allow(null, '')
})

const validate_create_dependent_support_amount = (data: any) =>{
    return schema_create_dependent_support_amount.validate(data);
}


export {validate_create_dependent_support_amount}