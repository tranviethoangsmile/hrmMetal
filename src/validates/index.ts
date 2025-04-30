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
import {
    validate_create_conversation,
    validate_create_conversation_group,
} from './conversation/conversation.validate';
import validate_create_delete_message from './deleteMessage/deleteMessage.validate';
import validate_create_delete_conversation from './deleteConversation/deleteConversation.validate';
import { validate_create_fcm_token } from './fcmToken/fcmToken.validate';
import {
    validate_create_events,
    validate_update_events,
    validate_get_event_with_position,
} from './events/events.validate';
import { create_massage_validate } from './message/message.validate';
import {
    validate_create_uniform_order,
    validate_position,
    validate_update_uniform_order,
    validate_seach_order_processing,
} from './uniformOrder/uniformOrder.validate';

import {
    validate_create_safetyReport,
    validate_update_safetyReport,
    validate_confirm_safetyReport,
} from './safetyReport/safetyReport.validate';
import {
    validate_create_order,
    validate_search_order,
    validate_checkin_picked_order,
} from './order/order.validate';
import {
    validate_create_day_off,
    validate_update_day_off,
} from './dayOff/dayOff.validate';
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
    validate_create_conversation_group,
    validate_create_delete_message,
    validate_create_delete_conversation,
    validate_create_fcm_token,
    validate_create_events,
    validate_update_events,
    create_massage_validate,
    validate_get_event_with_position,
    validate_create_uniform_order,
    validate_position,
    validate_update_uniform_order,
    validate_seach_order_processing,
    validate_create_safetyReport,
    validate_update_safetyReport,
    validate_confirm_safetyReport,
    validate_create_order,
    validate_search_order,
    validate_checkin_picked_order,
    validate_create_day_off,
    validate_update_day_off,
};
