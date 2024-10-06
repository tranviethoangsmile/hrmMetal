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
import {
    validate_create_information,
    validate_search_all_information,
} from './infomation/infomation.validate';

import {
    validate_create_paid,
    validate_search_paid,
    validate_update_paid,
} from './paidLeaveRequest/paidLeaveRequest.validate';
import { validate_create_conversation } from './conversation/conversation.validate';
import validate_create_delete_message from './deleteMessage/deleteMessage.validate';
import validate_create_delete_conversation from './deleteConversation/deleteConversation.validate';
import { validate_create_fcm_token } from './fcmToken/fcmToken.validate';
import {
    validate_create_events,
    validate_update_events,
} from './events/events.validate';
import { create_massage_validate } from './message/message.validate';
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
    validate_create_information,
    validate_search_all_information,
    validate_create_paid,
    validate_search_paid,
    validate_update_paid,
    validate_create_conversation,
    validate_create_delete_message,
    validate_create_delete_conversation,
    validate_create_fcm_token,
    validate_create_events,
    validate_update_events,
    create_massage_validate,
};
