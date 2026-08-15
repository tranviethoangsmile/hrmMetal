import { Router } from 'express';
import getAllOvertimeRequestRouter from './getAll/getAllOvertimeRequest.router';
import getOvertimeRequestByIdRouter from './getById/getById.router';
import updateIsConfirmOvertimeRequestRouter from './updateIsConfirm/updateIsConfirmRouter.router';
import getOvertimeByUserIdRouter from './getOTByUserId/getOvertimeByUserId.router';
import { requireRoles } from '../../middlewares';
const overtimeRequestRouter: Router = Router();
overtimeRequestRouter.use(
    '/getAll',
    requireRoles(['ADMIN']),
    getAllOvertimeRequestRouter
);
overtimeRequestRouter.use('/getbyid', getOvertimeRequestByIdRouter);

overtimeRequestRouter.use(
    '/updateisconfirm',
    updateIsConfirmOvertimeRequestRouter
);
overtimeRequestRouter.use('/getbyuserid', getOvertimeByUserIdRouter);
export default overtimeRequestRouter;
