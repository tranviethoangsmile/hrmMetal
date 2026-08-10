import { Router } from 'express';
import createEventsRouter from './createEvents.router';
import deleteEventsRouter from './deleteEvents.router';
const eventRouter: Router = Router();

eventRouter.use('/create-event', createEventsRouter);
eventRouter.use('/delete-event', deleteEventsRouter);

export default eventRouter;
