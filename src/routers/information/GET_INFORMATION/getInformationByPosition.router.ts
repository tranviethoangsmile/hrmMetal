import { Router } from "express";
import { GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER } from "../../../controllers";

const getInformationByPositionRouter: Router = Router();

getInformationByPositionRouter.post('/', GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER);

export default getInformationByPositionRouter;