import Joi from '@hapi/joi';

const schema_create_safetyReport = Joi.object({
    user_id: Joi.string().guid().required(),
    content: Joi.string().required(),
    title: Joi.string().required(),
    department_id: Joi.string().guid().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    solution: Joi.string().required(),
    corrective_action: Joi.string().optional().allow('', null),
    media_path: Joi.string().optional().allow('', null),
});

const schema_update_safetyReport = Joi.object({
    id: Joi.string().guid().required(),
    user_id: Joi.string().guid().optional().allow('', null),
    content: Joi.string().optional().allow('', null),
    title: Joi.string().optional().allow('', null),
    solution: Joi.string().optional().allow('', null),
    corrective_action: Joi.string().optional().allow('', null),
    leader_id: Joi.string().guid().optional().allow('', null),
});

const schema_confirm_safetyReport = Joi.object({
    id: Joi.string().guid().required(),
    leader_id: Joi.string().guid().required(),
    corrective_action: Joi.string().optional().allow('', null),
});

const schema_get_by_user_id = Joi.object({
    user_id: Joi.string().guid().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
});

const validate_create_safetyReport = (value: any) => {
    return schema_create_safetyReport.validate(value);
};

const validate_update_safetyReport = (value: any) => {
    return schema_update_safetyReport.validate(value);
};

const validate_confirm_safetyReport = (value: any) => {
    return schema_confirm_safetyReport.validate(value);
};

const validate_get_by_user_id = (value: any) => {
    return schema_get_by_user_id.validate(value);
};

export {
    validate_create_safetyReport,
    validate_update_safetyReport,
    validate_confirm_safetyReport,
    validate_get_by_user_id,
};
