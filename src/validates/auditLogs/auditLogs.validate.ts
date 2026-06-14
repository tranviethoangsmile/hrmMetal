import Joi from "@hapi/joi";


const schema_create_audit_logs = Joi.object({
    actor_id: Joi.string().guid().required(),
    actor_name: Joi.string().required(),
    action: Joi.string().required(),
    resource_type: Joi.string().required(),
    resource_id: Joi.string().guid().required(),
    old_value: Joi.object().required(),
    new_value: Joi.object().required(),
    ip_address: Joi.string().allow(null),

})

const CREATE_LOGS_VALIDATE = (value: any) => {
    return schema_create_audit_logs.validate(value)
}


export { CREATE_LOGS_VALIDATE }