import { Request, Response, Router } from 'express';
import createDepRouter from './create/create.router';
import getAllDepRouter from './getAll/getAll.router';
import getDepByIdRouter from './getById/getById.router';
const depRouter: Router = Router();

depRouter.use('/create', createDepRouter);
depRouter.use('/getall', getAllDepRouter);
depRouter.use('/getbyid', getDepByIdRouter);

export default depRouter;
