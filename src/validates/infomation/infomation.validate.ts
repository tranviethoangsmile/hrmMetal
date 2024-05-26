import Joi from '@hapi/joi';
const schema_create_infomation_validate = Joi.object({
    user_id: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.string().required(),
    position: Joi.string(),
    media: Joi.string(),
    is_video: Joi.boolean(),
    is_public: Joi.boolean(),
    is_check_safety: Joi.boolean(),
});

const schema_search_all_information_validate = Joi.object({
    user_id: Joi.string(),
    title: Joi.string(),
    content: Joi.string(),
    date: Joi.string(),
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
