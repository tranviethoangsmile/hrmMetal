import { Router } from "express";
import { CREATE_USER_FOR_ADMIN_CONTROLLER } from "../../../../controllers"; 

const createUserRouter: Router = Router();
createUserRouter.post('/', CREATE_USER_FOR_ADMIN_CONTROLLER)

export default createUserRouter;