import { Router } from 'express';
import createUniformOrderRouter from './create/create.router';
import searchUniOrderWithPositionRouter from './search/searchUniformOrderWithPosition.router';
import searchUniOrderWithUserIdRouter from './search/searchUniformOrderWithUserId.router';
import deleteUniOrderWithIdRouter from './delete/deleteUniformOrderWithId.router';
import getUniformOrderDetailRouter from './get/getUniformOrderDetail.router';
import updateUniformOrderRouter from './update/updateUniformOrder.router';
const uniformOrderRouter: Router = Router();
uniformOrderRouter.use('/create', createUniformOrderRouter);
uniformOrderRouter.use('/search', searchUniOrderWithPositionRouter);
uniformOrderRouter.use('/search', searchUniOrderWithUserIdRouter);
uniformOrderRouter.use('/delete', deleteUniOrderWithIdRouter);
uniformOrderRouter.use('/getuniformorderdetail', getUniformOrderDetailRouter);
uniformOrderRouter.use('/update', updateUniformOrderRouter);

export default uniformOrderRouter;
