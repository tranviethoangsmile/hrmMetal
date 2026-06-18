import { Router } from "express";
import adminRouter from "../admin/adminRouter.router";
import leaderRouter from "../leaderAndOther/leader.router";
import logsRouter from "../auditLogs/auditLogs.router";
const dashboardsRouter: Router = Router();
dashboardsRouter.use('/admin', adminRouter);
dashboardsRouter.use('/leader', leaderRouter)
dashboardsRouter.use('/logs', logsRouter)


export default dashboardsRouter;