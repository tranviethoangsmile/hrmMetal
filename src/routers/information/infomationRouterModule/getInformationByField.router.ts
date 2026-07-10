import { Request, Response, Router } from 'express';
import { search_all_information_with_field_controller } from '../../../controllers/information/information.controller';
import { errorResponse, successResponse } from '../../../helpers';
import { GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER } from '../../../controllers';
const searchAllRouter: Router = Router();

searchAllRouter.get('/', GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER);
export default searchAllRouter;
