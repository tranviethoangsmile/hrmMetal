import Joi from '@hapi/joi';
const schema_create_infomation_validate = Joi.object({
    user_id: Joi.string().guid().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    position: Joi.string(),
    media: Joi.string(),
    is_video: Joi.boolean(),
    is_public: Joi.boolean(),
    is_event: Joi.boolean(),
});

const schema_search_all_information_validate = Joi.object({
    user_id: Joi.string(),
    title: Joi.string(),
    content: Joi.string(),
    date: Joi.date().iso().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    position: Joi.string().required(),
    media: Joi.string(),
    is_video: Joi.boolean(),
    is_public: Joi.boolean(),
    is_check_safety: Joi.boolean(),
});

const validate_create_information = (value: any) => {
    return schema_create_infomation_validate.validate(value);
};

const validate_search_all_information = (value: any) => {
    return schema_search_all_information_validate.validate(value);
};

export { validate_create_information, validate_search_all_information };
