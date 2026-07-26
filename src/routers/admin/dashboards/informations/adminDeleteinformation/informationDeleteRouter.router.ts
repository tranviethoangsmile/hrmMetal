import { Router } from "express";
import { ADMIN_DELETE_INFORMATION_CONTROLLER } from "../../../../../controllers";
import { delete_media_path } from "../../../../../middlewares";

const informationDeleteRouter = Router();

informationDeleteRouter.post('/', delete_media_path, ADMIN_DELETE_INFORMATION_CONTROLLER);

export default informationDeleteRouter;