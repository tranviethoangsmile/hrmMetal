import { Router } from 'express';
import updateInventoryForLeaderRouter from './updateInventory.router';
const inventoryRouter: Router = Router();

inventoryRouter.use('/update-inventory', updateInventoryForLeaderRouter);

export default inventoryRouter;
