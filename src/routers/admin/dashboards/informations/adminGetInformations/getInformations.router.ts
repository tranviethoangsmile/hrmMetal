import { Router } from "express";
import { GET_INFORMATIONS_BY_ADMIN_ID_CONTROLLER } from "../../../../../controllers";

const getinformationsRouter: Router = Router();

getinformationsRouter.get('/', GET_INFORMATIONS_BY_ADMIN_ID_CONTROLLER);

export default getinformationsRouter;