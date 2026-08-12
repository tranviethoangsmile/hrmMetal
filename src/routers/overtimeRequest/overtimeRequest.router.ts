import { Router } from 'express';
import getAllOvertimeRequestRouter from './getAll/getallOverRequestRouter.router';
import getOvertimeRequestByIdRouter from './getById/getById.Router';
import updateIsConfirmOvertimeRequestRouter from './updateIsConfirm/updateIsConfirmRouter.router';
import getOvertimeByUserIdRouter from './getOTByUserId/getOvertimeByUserId.router';
import { authAdminRole } from '../../middlewares';
const overtimeRequestRouter: Router = Router();
overtimeRequestRouter.use(
    '/getAll',
    authAdminRole,
    getAllOvertimeRequestRouter
);
overtimeRequestRouter.use('/getbyid', getOvertimeRequestByIdRouter);

overtimeRequestRouter.use(
    '/updateisconfirm',
    updateIsConfirmOvertimeRequestRouter
);
overtimeRequestRouter.use('/getbyuserid', getOvertimeByUserIdRouter);
export default overtimeRequestRouter;
