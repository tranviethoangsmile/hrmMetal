import { Router } from "express";
import createDependentSupportAmountRouter from "./create/createDependentSupportAmount.router";
const dependentSupportAmountRouter: Router = Router();
dependentSupportAmountRouter.use('/create', createDependentSupportAmountRouter)

export default dependentSupportAmountRouter;