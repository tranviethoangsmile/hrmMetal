import { Router } from "express";
import { CREATE_INFORMATION_FOR_ADMIN_CONTROLLER } from "../../../../controllers";
import { create_media_path } from "../../../../middlewares";

const createInformationRouter: Router = Router();

createInformationRouter.post('/',create_media_path, CREATE_INFORMATION_FOR_ADMIN_CONTROLLER)


export default createInformationRouter;