import { Router, Request, Response } from 'express';
import findByDailyReportIdRouter from './findByDailyreportId/findByDailyReportId.router';

const errOfRpRouter: Router = Router();
errOfRpRouter.use('/findByDailyReportId', findByDailyReportIdRouter);

export default errOfRpRouter;
