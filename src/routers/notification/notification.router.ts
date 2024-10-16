import { Router } from 'express';
import createNotificationRouter from './create/create.notification.router';
import updateNotificationRouter from './update/update.notification.router';
import destroyNotificationRouter from './destroy/destroy.notification.router';
import searchNotificationRouter from './search/search.notification.router';
import searchNotificationByUserIdRouter from './searchByUserId/search.notification.userId.router';
const notificationRouter: Router = Router();

notificationRouter.use('/create', createNotificationRouter);
notificationRouter.use('/update', updateNotificationRouter);
notificationRouter.use('/destroy', destroyNotificationRouter);
notificationRouter.use('/search', searchNotificationRouter);
notificationRouter.use('/searchById', searchNotificationByUserIdRouter);
export default notificationRouter;
