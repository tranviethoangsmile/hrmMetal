import Joi from '@hapi/joi';
const scheme_create_checkin = Joi.object({
    user_id: Joi.string().required(),
    time_in: Joi.string().required(),
    date: Joi.string().required(),
    work_shift: Joi.string().required(),
    is_weekend: Joi.boolean(),
});

const scheme_update_checkin = Joi.object({
    user_id: Joi.string().required(),
    time_out: Joi.string().required(),
    date: Joi.string().required(),
    work_shift: Joi.string().required(),
    work_time: Joi.number(),
    over_time: Joi.number(),
});

const create_checkin_validate = (data: any) => {
    return scheme_create_checkin.validate(data);
};

const update_checkin_validate = (data: any) => {
    return scheme_update_checkin.validate(data);
};

export { create_checkin_validate, update_checkin_validate };
