import { Router } from "express";
import { ADMIN_CREATE_DEPARTMENT_CONTROLLER } from "../../../../../controllers";

const createDepartmentRouter: Router = Router();

createDepartmentRouter.post('/', ADMIN_CREATE_DEPARTMENT_CONTROLLER)


export default createDepartmentRouter;