import { Router } from "express";
import createTaxDependentRouter from "./create/create.router";
const taxDependentMainRouter: Router = Router();

taxDependentMainRouter.use('/create', createTaxDependentRouter)

export default taxDependentMainRouter;