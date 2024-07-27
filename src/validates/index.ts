import Joi from '@hapi/joi';
import {
    validate_create_plan_production,
    validate_update_plan_production,
    validate_search_plan_production_seven_day_of_department,
} from './planProduction/planProduction.validate';
import { validate_create_notification } from './notification/notification.validate';
const schema_id = Joi.string().guid().required();

const validation_id = (id: string) => {
    return schema_id.validate(id);
};

export {
    validation_id,
    validate_create_plan_production,
    validate_update_plan_production,
    validate_search_plan_production_seven_day_of_department,
    validate_create_notification,
};
