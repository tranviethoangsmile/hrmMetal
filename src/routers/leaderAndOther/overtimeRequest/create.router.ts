import { Router } from 'express';
import { CREATE_OVERTIME_REQUEST_BY_LEADER_CONTROLLER } from '../../../controllers';
const createOvertimeRequestRouter: Router = Router();

createOvertimeRequestRouter.post(
    '/',
    CREATE_OVERTIME_REQUEST_BY_LEADER_CONTROLLER
);

export default createOvertimeRequestRouter;
