import { Router } from 'express';
import createOvertimeRequestRouter from './create/createOvertimeRequest.router';
import getAllOvertimeRequestRouter from './getAll/getallOverRequestRouter.router';
import getOvertimeRequestByIdRouter from './getById/getById.Router';
import updateIsConfirmOvertimeRequestRouter from './updateIsConfirm/updateIsConfirmRouter.router';
import deleteOvertimeRequestByIdRouter from './deleteById/deleteOvertimeRequestById.router';
import { authAdminRole } from '../../middlewares';
const overtimeRequestRouter: Router = Router();

overtimeRequestRouter.use('/create', createOvertimeRequestRouter);
overtimeRequestRouter.use(
    '/getAll',
    authAdminRole,
    getAllOvertimeRequestRouter,
);
overtimeRequestRouter.use('/getbyid', getOvertimeRequestByIdRouter);

overtimeRequestRouter.use(
    '/updateisconfirm',
    updateIsConfirmOvertimeRequestRouter,
);
overtimeRequestRouter.use('/deletebyid', deleteOvertimeRequestByIdRouter);
export default overtimeRequestRouter;
