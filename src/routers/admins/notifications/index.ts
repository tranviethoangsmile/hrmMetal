import { Router } from 'express';
import createNotificationRouter from './createNotificationRouter';
const notificationRouter: Router = Router();
notificationRouter.use('/create-notification', createNotificationRouter);
export default notificationRouter;
