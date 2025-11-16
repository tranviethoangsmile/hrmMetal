import { Router } from "express";
import createTaxDependentRouter from "./create/create.router";
import deleteTaxDependentRouter from "./delete/deleteTaxDependentRouter.router";
const taxDependentMainRouter: Router = Router();

taxDependentMainRouter.use('/create', createTaxDependentRouter)
taxDependentMainRouter.use('/delete', deleteTaxDependentRouter)

export default taxDependentMainRouter;