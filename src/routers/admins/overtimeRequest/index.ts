import { Router } from 'express';
import updateApproveOvertimeRequest from './updateApproveOvertimeRequest.router';
const overtimeRequestRouter: Router = Router();
overtimeRequestRouter.use(
    '/update-approve-overtime-request',
    updateApproveOvertimeRequest
);
export default overtimeRequestRouter;
