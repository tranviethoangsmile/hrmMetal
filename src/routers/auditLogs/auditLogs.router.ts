import { Router } from "express";
import { SEARCH_LOGS_CONTROLLER } from "../../controllers";
import { authJwt, requireRoles } from "../../middlewares";

const logsRouter: Router = Router();
logsRouter.use(authJwt);
logsRouter.use(requireRoles(['ADMIN', 'MANAGER']))
logsRouter.post('/search', SEARCH_LOGS_CONTROLLER)

export default logsRouter