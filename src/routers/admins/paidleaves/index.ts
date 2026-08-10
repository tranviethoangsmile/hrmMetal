import { Router } from 'express';
import isConfirmPaidLeaveFromAdmin from './paidleave.confirm.router';
const paidLeaveRouter: Router = Router();

paidLeaveRouter.use('/paid-leave-confirm', isConfirmPaidLeaveFromAdmin);

export default paidLeaveRouter;
