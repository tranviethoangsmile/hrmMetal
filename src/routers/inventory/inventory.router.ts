import { Router, Request, Response } from 'express';
import createRouter from './create/create';
const inventoryRouter: Router = Router();
inventoryRouter.use('/create', createRouter);

export default inventoryRouter;
