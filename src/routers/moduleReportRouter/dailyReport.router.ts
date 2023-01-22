import { Router, Request, Response } from "express";
import { find_report } from "../../controllers/dailyReport.controler";
import moment from "moment-timezone";
const dailyRpRouter = Router();


dailyRpRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if(data?.date != null) {
            data.date = moment().toDate();
        }
        const reports = await find_report(data);
        if(reports?.success) {
            res.status(201).send(reports?.data)
        }else {
            res.status(201).send(reports?.message)
        }
    } catch (error) {
        res.status(500).send({
            message: 'server error'
        })
    }
} )

export default dailyRpRouter;