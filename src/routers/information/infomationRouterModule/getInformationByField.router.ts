import { Router } from 'express';
import { GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER } from '../../../controllers';

const searchAllRouter: Router = Router();

searchAllRouter.post('/', GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER);

export default searchAllRouter;
