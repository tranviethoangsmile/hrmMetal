import { Router } from 'express';
import createEventsRouter from './create/create.router';
import deleteEventsRouter from './delete/delete.router';
import updateEventsRouter from './update/update.router';
import searchEventById from './searchById/searchEvenById.router';
import getAllEventRouter from './getAll/getAllEvents.router';
const eventsRouter: Router = Router();
eventsRouter.use('/create', createEventsRouter);
eventsRouter.use('/delete', deleteEventsRouter);
eventsRouter.use('/update', updateEventsRouter);
eventsRouter.use('/searchbyid', searchEventById);
eventsRouter.use('/getall', getAllEventRouter);
export default eventsRouter;