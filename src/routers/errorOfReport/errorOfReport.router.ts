import { Router, Request, Response } from 'express';
import { find_err_of_report } from '../../controllers/errorOfReport/errorOfReport.controller';

const errOfRpRouter: Router = Router();

errOfRpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const daily_report_id: object | null = req.body;
        if (daily_report_id != null) {
            const errs = await find_err_of_report(daily_report_id);
            if (errs?.success) {
                res.status(201).send({
                    success: true,
                    data: errs?.data,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: errs?.message,
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'daily_report_id not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default errOfRpRouter;
