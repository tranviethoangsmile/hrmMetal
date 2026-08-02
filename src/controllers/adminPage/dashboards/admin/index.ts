import { CREATE_USER_FOR_ADMIN_CONTROLLER } from "./users/adminCreateUser.controller";
import { DELETE_EVENTS_FOR_ADMIN_CONTROLLER } from "./events/adminDeleteEvents.controller";
import { CREATE_EVENTS_FOR_ADMIN_CONTROLLER } from "./events/adminCreateEvents.controller";
import { ADMIN_CREATE_DEPARTMENT_CONTROLLER } from "./departments/create/create.controller";
import { CREATE_ORDER_FOR_ADMIN_CONTROLLER } from "./orders/adminCreateOrderforUser.controller.ts";
import { ADMIN_DELETE_INFORMATION_CONTROLLER } from "./informations/adminDeleteInformation.controler";
import { GET_INFORMATIONS_BY_ADMIN_ID_CONTROLLER } from "./informations/adminGetInformations.controller";
import { CREATE_INFORMATION_FOR_ADMIN_CONTROLLER } from "./informations/adminCreateInformation.controller";
import { CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER } from "./notifications/adminCreateNotification.controller";
import { UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER } from "./taxDependent/adminUpdateStatusTaxDependent.controller";

export {
    CREATE_USER_FOR_ADMIN_CONTROLLER,
    CREATE_ORDER_FOR_ADMIN_CONTROLLER,
    CREATE_EVENTS_FOR_ADMIN_CONTROLLER,
    DELETE_EVENTS_FOR_ADMIN_CONTROLLER,
    ADMIN_CREATE_DEPARTMENT_CONTROLLER,
    ADMIN_DELETE_INFORMATION_CONTROLLER,
    UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER,
    CREATE_INFORMATION_FOR_ADMIN_CONTROLLER,
    GET_INFORMATIONS_BY_ADMIN_ID_CONTROLLER,
    CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER,
}