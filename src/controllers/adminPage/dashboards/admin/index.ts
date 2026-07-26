import { CREATE_USER_FOR_ADMIN_CONTROLLER } from "./users/adminCreateUser.controller";
import { CREATE_ORDER_FOR_ADMIN_CONTROLLER } from "./orders/adminCreateOrderforUser.controller.ts";
import { CREATE_INFORMATION_FOR_ADMIN_CONTROLLER } from "./informations/adminCreateInformation.Controller";
import { CREATE_EVENTS_FOR_ADMIN_CONTROLLER } from "./events/adminCreateEvents.controller";
import { CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER } from "./notifications/adminCreateNotification.controller";
import { UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER } from "./taxDependent/adminUpdateStatusTaxDependent.controller";
import { ADMIN_DELETE_INFORMATION_CONTROLLER } from "./informations/adminDeleteInformation.controler";
import { ADMIN_CREATE_DEPARTMENT_CONTROLLER } from "./departments/create/create.controller";
import { DELETE_EVENTS_FOR_ADMIN_CONTROLLER } from "./events/adminDeleteEvents.controller";

export {
    CREATE_USER_FOR_ADMIN_CONTROLLER,
    CREATE_ORDER_FOR_ADMIN_CONTROLLER,
    CREATE_EVENTS_FOR_ADMIN_CONTROLLER,
    CREATE_INFORMATION_FOR_ADMIN_CONTROLLER,
    CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER,
    UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER,
    ADMIN_DELETE_INFORMATION_CONTROLLER,
    ADMIN_CREATE_DEPARTMENT_CONTROLLER,
    DELETE_EVENTS_FOR_ADMIN_CONTROLLER,
}