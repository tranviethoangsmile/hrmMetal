import { Router } from "express";
import adminRouter from "../admin/adminRouter.router";
import leaderRouter from "../leaderAndOther/leader.router";
const dashboardsRouter: Router = Router();
dashboardsRouter.use('/admin', adminRouter);
dashboardsRouter.use('/leader', leaderRouter)


export default dashboardsRouter;