import { Router } from 'express';
import createNotificationRouter from './create/create.notification.router';
import updateNotificationRouter from './update/update.notification.router';
const notificationRouter: Router = Router();

notificationRouter.use('/create', createNotificationRouter);
notificationRouter.use('/update', updateNotificationRouter);
export default notificationRouter;
