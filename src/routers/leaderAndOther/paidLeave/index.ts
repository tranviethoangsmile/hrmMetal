import { Router } from 'express';
import handleApprovePaidLeaveRequestRouter from './handleApproveRouter.router';
import GetPaidLeaveRequestForLeaderAndOtherRouter from './GetPaidLeaveRequestRouter.router';

const paidLeaveRouter: Router = Router();

paidLeaveRouter.use(
    '/get-paid-leave-request',
    GetPaidLeaveRequestForLeaderAndOtherRouter
);

paidLeaveRouter.use(
    '/approve-paid-leave-request',
    handleApprovePaidLeaveRequestRouter
);

export default paidLeaveRouter;
