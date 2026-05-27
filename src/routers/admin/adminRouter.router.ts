import { Router, Request, Response } from "express";
import adminOptionRouter from "./options/options.router";
const adminRouter: Router = Router();

adminRouter.use('/options', adminOptionRouter)

export default adminRouter;