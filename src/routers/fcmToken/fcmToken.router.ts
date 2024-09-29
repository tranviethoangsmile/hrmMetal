import { Router } from 'express';
import createFcm from './create/create.fcmToken.router';
const fcmTokenRouter: Router = Router();

fcmTokenRouter.use('/create', createFcm);

export default fcmTokenRouter;
