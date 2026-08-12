import { Router } from 'express';
import updateApproveOvertimeRequest from './updateApproveOvertimeRquest.router';
const overtimeRequestRouter: Router = Router();
overtimeRequestRouter.use(
    '/update-approve-overtime-request',
    updateApproveOvertimeRequest
);
export default overtimeRequestRouter;
