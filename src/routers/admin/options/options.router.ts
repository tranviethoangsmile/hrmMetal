import { Router, Request, Response } from "express";
import getEnumRouter from "./getEnum/getEnum.router";

const adminOptionRouter: Router = Router();

adminOptionRouter.use('/enums', getEnumRouter)

export default adminOptionRouter;