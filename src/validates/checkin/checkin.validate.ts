import Joi from '@hapi/joi';
const scheme_create_checkin = Joi.object({
    user_id: Joi.string().required(),
    time_in: Joi.string().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    work_shift: Joi.string().required(),
    is_weekend: Joi.boolean(),
});

const scheme_update_checkin = Joi.object({
    user_id: Joi.string().required(),
    time_out: Joi.string().required(),
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    work_shift: Joi.string().required(),
    is_checked: Joi.boolean().required(),
    work_time: Joi.number(),
    over_time: Joi.number(),
});

const schema_get_checkin_in_date_of_position = Joi.object({
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    position: Joi.string().required(),
});

const schema_get_checkin_detail_in_date_of_user = Joi.object({
    date: Joi.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    user_id: Joi.string().required(),
});

const create_checkin_validate = (data: any) => {
    return scheme_create_checkin.validate(data);
};

const update_checkin_validate = (data: any) => {
    return scheme_update_checkin.validate(data);
};

const get_checkin_in_date_of_position_validate = (data: any) => {
    return schema_get_checkin_in_date_of_position.validate(data);
};

const get_checkin_detail_in_day_of_user_validate = (data: any) => {
    return schema_get_checkin_detail_in_date_of_user.validate(data);
};
export {
    create_checkin_validate,
    update_checkin_validate,
    get_checkin_in_date_of_position_validate,
    get_checkin_detail_in_day_of_user_validate,
};
