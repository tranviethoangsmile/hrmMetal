import { Router } from 'express';
import createUniformOrderRouter from './create/create.router';
import searchUniOrderWithPositionRouter from './search/searchUniformOrderWithPosition.router';
import searchUniOrderWithUserIdRouter from './search/searchUniformOrderWithUserId.router';
const uniformOrderRouter: Router = Router();
uniformOrderRouter.use('/create', createUniformOrderRouter);
uniformOrderRouter.use('/search', searchUniOrderWithPositionRouter);
uniformOrderRouter.use('/search', searchUniOrderWithUserIdRouter);
export default uniformOrderRouter;
