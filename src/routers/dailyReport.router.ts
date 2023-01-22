import { Router, Request, Response } from "express";
import { daily_report_create } from '../controllers/dailyReport.controler'
const rpRouter = Router();

rpRouter.post('/', async (req: Request, res: Response) => {
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
})

export default rpRouter;