import { Router } from "express";
import { create_media_path } from "../../../../middlewares";
import { CREATE_EVENTS_FOR_ADMIN_CONTROLLER } from "../../../../controllers";
const createEventsRouter: Router = Router();

createEventsRouter.post('/', create_media_path, CREATE_EVENTS_FOR_ADMIN_CONTROLLER)

export default createEventsRouter;