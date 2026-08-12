import { Router } from 'express';
import { DESTROY_OVERTIME_REQUEST_BY_LEADER_CONTROLLER } from '../../../controllers';
const destroyOvertimeRequestRouter: Router = Router();
destroyOvertimeRequestRouter.post(
    '/',
    DESTROY_OVERTIME_REQUEST_BY_LEADER_CONTROLLER
);
export default destroyOvertimeRequestRouter;
