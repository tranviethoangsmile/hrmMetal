import { Router } from 'express';
import { DELETE_EVENTS_FOR_ADMIN_CONTROLLER } from '../../../controllers';
const deleteEventsRouter: Router = Router();

deleteEventsRouter.post('/', DELETE_EVENTS_FOR_ADMIN_CONTROLLER);

export default deleteEventsRouter;
