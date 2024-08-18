import Joi from '@hapi/joi';
import {
    validate_create_plan_production,
    validate_update_plan_production,
    validate_search_plan_production_seven_day_of_department,
} from './planProduction/planProduction.validate';
import { validate_create_notification } from './notification/notification.validate';
import {
    create_checkin_validate,
    update_checkin_validate,
    get_checkin_in_date_of_position_validate,
    get_checkin_detail_in_day_of_user_validate,
} from '../validates/checkin/checkin.validate';
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
    create_checkin_validate,
    update_checkin_validate,
    get_checkin_in_date_of_position_validate,
    get_checkin_detail_in_day_of_user_validate,
};
