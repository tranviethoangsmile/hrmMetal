import { Router } from 'express';
import { UPDATE_INVENTORY_FOR_LEADER_CONTROLLER } from '../../../controllers';

const updateInventoryForLeaderRouter: Router = Router();

updateInventoryForLeaderRouter.post(
    '/',
    UPDATE_INVENTORY_FOR_LEADER_CONTROLLER
);

export default updateInventoryForLeaderRouter;
