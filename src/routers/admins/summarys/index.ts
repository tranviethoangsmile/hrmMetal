import { Router } from 'express';
import adminSummaryRouter from './dashboardSummary.router';
const summarysRouter: Router = Router();

summarysRouter.use('/s', adminSummaryRouter);

export default summarysRouter;
