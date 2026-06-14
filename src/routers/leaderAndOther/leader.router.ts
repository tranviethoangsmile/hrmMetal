import { Router } from "express";
import { authJwt, requireRoles } from "../../middlewares";
import handleApprovePaidLeaveRequestRouter from "./paidLeave/handleApproveRouter.router";
import GetPaidLeaveRequestForLeaderAndOtherRouter from "./paidLeave/GetPaidLeaveRequestRouter.router";
const leaderRouter: Router = Router();
leaderRouter.use(authJwt);
leaderRouter.use(requireRoles(['LEADER','SUPERVISOR','MANAGER']))
leaderRouter.use('/approve-paid-leave-request', handleApprovePaidLeaveRequestRouter)
leaderRouter.use('/get-paid-leave-request', GetPaidLeaveRequestForLeaderAndOtherRouter)
export default leaderRouter;