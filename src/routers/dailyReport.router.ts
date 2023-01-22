import { Router, Request, Response } from "express";
import { daily_report_create, find_all_report } from '../controllers/dailyReport.controler'
const rpRouter = Router();

rpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
    const created_rp = await daily_report_create(data);
    if(created_rp) {
        res.status(201).send(created_rp);
    }else {
        res.status(201).end({
            error: true,
            message: 'err'
        })
    }
    } catch (error) {
        res.status(500).send({
            message: 'Server error'
        })
    }  
});

rpRouter.get('/', async (req: Request, res: Response) => {
    try {
        const reports = await find_all_report();
        if(reports?.success) {
            res.status(201).send(reports?.data?.reports);
        }else {
            res.status(201).send(reports?.message);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Server error'
        })
    }
})

export default rpRouter;