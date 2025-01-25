import Joi from '@hapi/joi';

const schema_create_safetyReport = Joi.object({
    user_id: Joi.string().guid().required(),
    content: Joi.string().required(),
    title: Joi.string().required(),
    department_id: Joi.string().guid().required(),
    date: Joi.string().isoDate().required(),
});

const schema_update_safetyReport = Joi.object({
    id: Joi.string().guid().required(),
    user_id: Joi.string().guid().required(),
    content: Joi.string(),
    title: Joi.string(),
});

const schema_confirm_safetyReport = Joi.object({
    id: Joi.string().guid().required(),
    leader_id: Joi.string().guid().required(),
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

export {
    validate_create_safetyReport,
    validate_update_safetyReport,
    validate_confirm_safetyReport,
};
