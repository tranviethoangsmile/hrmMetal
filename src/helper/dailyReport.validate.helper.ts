import Joi from "@hapi/joi";

const schame_create_daily_report = Joi.object({
    product : Joi.string().required(),
    user_id : Joi.string().guid(),
    date : Joi.date().required(),
    shift: Joi.string().required(),
    quantity : Joi.number().min(0).max(999).required(),
    operated_time: Joi.number().min(0).max(999).required(),
    shutdown_time: Joi.number().min(0).max(999).required(),
    active_time: Joi.number().min(0).max(999).required(),
    operator_history : Joi.string().required(),
})

const valid_create_daily_report = (data: any ) => {
    return schame_create_daily_report.validate(data);
}

export { valid_create_daily_report };