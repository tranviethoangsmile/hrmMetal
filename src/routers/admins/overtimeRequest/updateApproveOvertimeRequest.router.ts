import { Router } from 'express';
import { UPDATE_APPROVE_OVERTIME_REQUEST_BY_ADMIN_CONTROLLER } from '../../../controllers';
const updateApproveOvertimeRequest: Router = Router();
updateApproveOvertimeRequest.post(
    '/',
    UPDATE_APPROVE_OVERTIME_REQUEST_BY_ADMIN_CONTROLLER
);
export default updateApproveOvertimeRequest;
