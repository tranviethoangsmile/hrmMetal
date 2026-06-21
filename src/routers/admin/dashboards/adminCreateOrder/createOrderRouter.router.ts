import { Router } from "express";
import { CREATE_ORDER_FOR_ADMIN_CONTROLLER } from "../../../../controllers";

const createOrderRouter: Router = Router();
createOrderRouter.post('/', CREATE_ORDER_FOR_ADMIN_CONTROLLER)
export default createOrderRouter;