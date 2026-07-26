import { Router } from 'express';
import adminOptionRouter from './options/options.router';
import { authJwt, requireRoles } from '../../middlewares';
import getUsersRouter from './dashboards/users/adminGetUsers/getUsersRouter';
import getOrderRouter from './dashboards/orders/adminGetOrder/getOrderRouter';
import adminSummaryRouter from './dashboards/summarys/dashboardSummary.router';
import createUserRouter from './dashboards/users/adminCreateUser/createUser.router';
import getCheckinsRouter from './dashboards/checkins/adminGetCheckins/getCheckinsRouter';
import deleteEventsRouter from './dashboards/events/adminDeleteEvents/deleteEvents.router';
import createEventsRouter from './dashboards/events/adminCreateEvents/createEvents.router';
import createOrderRouter from './dashboards/orders/adminCreateOrder/createOrderRouter.router';
import createDepartmentRouter from './dashboards/departments/adminCreateDepartment/create.router';
import isConfirmPaidLeaveFromAdmin from './dashboards/paidLeaves/adminConfirmPaidleave/paidleave.confirm.router';
import createNotificationRouter from './dashboards/notifications/adminCreateNotification/createNotificationRouter';
import informationDeleteRouter from './dashboards/informations/adminDeleteinformation/informationDeleteRouter.router';
import createInformationRouter from './dashboards/informations/adminCreateInformation/createInformationRouter.router';
import updateStatusTaxDependentRouter from './dashboards/tax_dependents/adminUpdateStatusTaxDependent/updateStatusTaxDependent.router';
const adminRouter: Router = Router();

adminRouter.use(authJwt);
adminRouter.use(requireRoles(['ADMIN']));
adminRouter.use('/get-users', getUsersRouter)
adminRouter.use('/get-orders', getOrderRouter)
adminRouter.use('/options', adminOptionRouter);
adminRouter.use('/summarys', adminSummaryRouter)
adminRouter.use('/create-user', createUserRouter)
adminRouter.use('/create-order',createOrderRouter)
adminRouter.use('/get-checkins', getCheckinsRouter)
adminRouter.use('/delete-events', deleteEventsRouter)
adminRouter.use('/create-events', createEventsRouter)
adminRouter.use('/create-departments', createDepartmentRouter)
adminRouter.use('/delete-informations', informationDeleteRouter)
adminRouter.use('/create-informations', createInformationRouter)
adminRouter.use('/create-notifications', createNotificationRouter)
adminRouter.use('/confirm-paid-leave', isConfirmPaidLeaveFromAdmin)
adminRouter.use('/update-status-tax-dependent', updateStatusTaxDependentRouter)
export default adminRouter;
