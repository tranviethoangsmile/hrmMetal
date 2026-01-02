import Joi from '@hapi/joi';

const schema_create_tax_dependent = Joi.object({
    user_id: Joi.string().guid().required(),
    name: Joi.string().min(2).max(255).required(),
    dob: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
    identification_number: Joi.string().max(20).allow(null, ''),
    phone: Joi.string().max(11).allow(null, ''),
    address: Joi.string().max(255).allow(null, ''),
    relationship: Joi.string()
        .valid('CHILD', 'SPOUSE', 'PARENT', 'SIBLING', 'OTHER')
        .required(),
    tax_code: Joi.string().max(20).allow(null, ''),
    media_path: Joi.string().allow(null, ''),
    deduction_amount: Joi.number().allow(null),
    status: Joi.string()
        .valid('PENDING', 'APPROVED', 'REJECTED')
        .allow(null,''),
    notes: Joi.string().allow(null, ''),
});

const schema_update_tax_dependent = Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string().min(2).max(255).allow(null, ''),
    user_id: Joi.string().guid().required(),
    dob: Joi.date().iso().allow(null, ''),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').allow(null, ''),
    identification_number: Joi.string().max(20).allow(null, ''),
    phone: Joi.string().max(11).allow(null, ''),
    address: Joi.string().max(255).allow(null, ''),
    media_path: Joi.string().allow(null, ''),
    relationship: Joi.string()
        .valid('CHILD', 'SPOUSE', 'PARENT', 'SIBLING', 'OTHER')
        .allow(null, ''),
    tax_code: Joi.string().max(20).allow(null, ''),
    deduction_amount: Joi.number().allow(null),
    notes: Joi.string().allow(null, ''),
});

const validate_update_tax_dependent = (data: any) => {
    return schema_update_tax_dependent.validate(data);
};

const validate_create_tax_dependent = (data: any) => {
    return schema_create_tax_dependent.validate(data);
};

export {validate_create_tax_dependent, validate_update_tax_dependent}