import { Router } from "express";
import { UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER } from "../../../../../controllers";
const updateStatusTaxDependentRouter: Router = Router();

updateStatusTaxDependentRouter.put('/', UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER);

export default updateStatusTaxDependentRouter;