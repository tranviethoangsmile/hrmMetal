import { Router, Request, Response } from 'express';
import {
    daily_report_create,
    find_all_report,
    find_report_by_id,
} from '../../controllers/dailyReport/dailyReport.controler';
import dailyRpRouter from './moduleReportRouter/dailyReport.router';
import createDailyReportRouter from './create/create';
import getAllDailyReport from './getAllDailyReport/getAllDailyReport.router';
const rpRouter: Router = Router();
rpRouter.use('/create', createDailyReportRouter);
rpRouter.use('/getall', getAllDailyReport);
rpRouter.use('/search', dailyRpRouter);
rpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != null) {
            const created_rp = await daily_report_create(data);
            if (created_rp?.success) {
                res.status(201).send({
                    success: true,
                    data: created_rp,
                });
            } else {
                res.status(200).end({
                    success: false,
                    message: created_rp?.message,
                });
            }
        } else {
            res.status(400).end({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

rpRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        if (id != null) {
            const report = await find_report_by_id(id);
            if (report?.success) {
                res.status(201).send({
                    success: true,
                    data: report?.data,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: 'report not found',
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

export default rpRouter;
