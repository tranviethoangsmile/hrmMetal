import { Router, Request, Response } from 'express';
import {
    daily_report_create,
    find_all_report,
    find_report_by_id
} from '../controllers/dailyReport.controler';
import dailyRpRouter from './moduleReportRouter/dailyReport.router';
const rpRouter = Router();

rpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if(data != null) {
            const created_rp = await daily_report_create(data);
            console.log(created_rp);
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
        }else {
            res.status(400).end({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + error,
        });
    }
});

rpRouter.get('/', async (req: Request, res: Response) => {
    try {
        const reports = await find_all_report();
        if (reports?.success) {
            res.status(201).send({
                success: true,
                data: reports?.data,
            });
        } else {
            res.status(200).send({
                success: false,
                message: reports?.message,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + error,
        });
    }
});

rpRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        if(id != null) {
            const report = await find_report_by_id(id);
            if(report?.success) {
                res.status(201).send({
                    success: true,
                    data: report?.data
                })
            }else {
                res.status(200).send({
                    success: false,
                    message: 'report not found',
                })
            }
        }else {
            res.status(400).send({
                success: false,
                message: 'id not empty',
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + error,
        })
    }
})

rpRouter.use('/search', dailyRpRouter);

export default rpRouter;
