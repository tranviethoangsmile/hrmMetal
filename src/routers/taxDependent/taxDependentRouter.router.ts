import { Router } from "express";
import createTaxDependentRouter from "./create/create.router";
import deleteTaxDependentRouter from "./delete/deleteTaxDependentRouter.router";
import updateTaxDependentRouter from "./update/updateTaxDependentRouter.router";
import getAllTaxDependentByUserIdRouter from "./getAllByUserId/getAllTaxDependentByUserId.router";
import updateStatusRouter from "./updateStatus/updateStatusRouter.router";
const taxDependentMainRouter: Router = Router();

taxDependentMainRouter.use('/create', createTaxDependentRouter)
taxDependentMainRouter.use('/delete', deleteTaxDependentRouter)
taxDependentMainRouter.use('/update', updateTaxDependentRouter)
taxDependentMainRouter.use('/get-all-by-user-id', getAllTaxDependentByUserIdRouter)
taxDependentMainRouter.use('/update-status', updateStatusRouter)
export default taxDependentMainRouter;