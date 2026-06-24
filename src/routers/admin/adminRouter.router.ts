import { Router } from 'express';
import { authJwt, requireRoles } from '../../middlewares';
import adminOptionRouter from './options/options.router';
import adminSummaryRouter from './dashboards/summarys/dashboardSummary.router';
import isConfirmPaidLeaveFromAdmin from './dashboards/adminConfirmPaidleave/paidleave.confirm.router';
import getCheckinsRouter from './dashboards/adminGetCheckins/getCheckinsRouter';
import getOrderRouter from './dashboards/adminGetOrder/getOrderRouter';
import getUsersRouter from './dashboards/adminGetUsers/getUsersRouter';
import createUserRouter from './dashboards/adminCreateUser/createUser.router';
import createOrderRouter from './dashboards/adminCreateOrder/createOrderRouter.router';
import createEventsRouter from './dashboards/adminCreateEvents/createEvents.router';
const adminRouter: Router = Router();

adminRouter.use(authJwt);
adminRouter.use(requireRoles(['ADMIN']));
adminRouter.use('/options', adminOptionRouter);
adminRouter.use('/summarys', adminSummaryRouter)
adminRouter.use('/confirm', isConfirmPaidLeaveFromAdmin)
adminRouter.use('/get-checkins', getCheckinsRouter)
adminRouter.use('/get-orders', getOrderRouter)
adminRouter.use('/get-users', getUsersRouter)
adminRouter.use('/create-user', createUserRouter)
adminRouter.use('/create-order',createOrderRouter)
adminRouter.use('/create-events', createEventsRouter)
export default adminRouter;
