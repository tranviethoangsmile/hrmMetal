import { Request, Response, Router } from 'express';
import createDepRouter from './create/create.router';
import getAllDepRouter from './getAll/getall.router';
import getDepByIdRouter from './getById/getbyid.router';
const depRouter: Router = Router();
import { getDepartmentById } from '../../controllers';

depRouter.use('/create', createDepRouter);
depRouter.use('/getall', getAllDepRouter);
depRouter.use('/getbyid', getDepByIdRouter);

export default depRouter;
