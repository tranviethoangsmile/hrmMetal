import { Router, Request, Response } from 'express';
import { find_report } from '../../../controllers/dailyReport/dailyReport.controler';
import moment from 'moment-timezone';
const dailyRpRouter = Router();

dailyRpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != null) {
            if (data?.date != null) {
                const date = moment(data.date, 'YYYY/MM/DD');
                data.date = date.toISOString();
            }
            const reports = await find_report(data);
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
        } else {
            res.status(400).send({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error:' + error?.message,
        });
    }
});

export default dailyRpRouter;
