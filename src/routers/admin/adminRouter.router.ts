import { Router } from 'express';
import { authJwt, requireRoles } from '../../middlewares';
import adminOptionRouter from './options/options.router';
import adminSummaryRouter from './dashboards/summarys/dashboardSummary.router';
import isConfirmPaidLeaveFromAdmin from './dashboards/adminConfirm/paidleave.confirm.router';


const adminRouter: Router = Router();

adminRouter.use(authJwt);
adminRouter.use(requireRoles(['ADMIN']));
adminRouter.use('/options', adminOptionRouter);
adminRouter.use('/dashboards', adminSummaryRouter)
adminRouter.use('/confirm', isConfirmPaidLeaveFromAdmin)
export default adminRouter;
