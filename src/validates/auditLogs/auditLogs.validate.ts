import Joi from "@hapi/joi";


const schema_create_audit_logs = Joi.object({
    actor_id: Joi.string().guid().required(),
    actor_name: Joi.string().required(),
    action: Joi.string().required(),
    resource_type: Joi.string().required(),
    resource_id: Joi.string().guid().required(),
    old_value: Joi.object().allow(null),
    new_value: Joi.object().allow(null),
    ip_address: Joi.string().allow(null),

})
const schema_search_audit_logs = Joi.object({
    resource_type: Joi.string().allow(null).optional(),
    actor_id:      Joi.string().guid().allow(null).optional(),
    from:          Joi.date().iso().allow(null).optional()
                     .messages({ 'date.format': 'from: must be ISO 8601 format (YYYY-MM-DD)' }),
    to:            Joi.date().iso().allow(null).optional()
                     .messages({ 'date.format': 'to: must be ISO 8601 format (YYYY-MM-DD)' }),
    page:          Joi.number().integer().min(1).default(1),
    limit:         Joi.number().integer().min(1).max(100).default(20),
}).custom((value) => {
    const { from, to } = value;
    if (from && to && new Date(from) > new Date(to)) {
        throw new Error('from must be before to');
    }
    return value;
});
const SEARCH_LOGS_VALIDATE = (value: any) => {
    return schema_search_audit_logs.validate(value)
}
const CREATE_LOGS_VALIDATE = (value: any) => {
    return schema_create_audit_logs.validate(value)
}


export { CREATE_LOGS_VALIDATE, SEARCH_LOGS_VALIDATE }