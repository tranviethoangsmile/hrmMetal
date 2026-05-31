import { Router } from 'express';
import adminOptionRouter from './options/options.router';
import adminSummaryRouter from './dashboards/summarys/dashboardSummary.router';
import { authJwt, requireRoles } from '../../middlewares';


const adminRouter: Router = Router();

adminRouter.use(authJwt);
adminRouter.use(requireRoles(['ADMIN']));
adminRouter.use('/options', adminOptionRouter);
adminRouter.use('/dashboards', adminSummaryRouter)

export default adminRouter;
