import { Router } from "express";
import { CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER } from "../../../../controllers";

const createNotificationRouter: Router = Router();

createNotificationRouter.post('/', CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER);

export default createNotificationRouter;