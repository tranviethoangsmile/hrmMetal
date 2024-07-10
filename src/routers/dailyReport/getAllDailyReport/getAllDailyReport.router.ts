import { Router, Request, Response } from 'express';
import { find_all_report } from '../../../controllers/dailyReport/dailyReport.controler';
import { search_report } from '../../../interfaces/dailyReport/dailyReport.interface';
import { valid_search_daily_report } from '../../../validates/dailyReport/dailyReport.validate';
import { Products } from '../../../enum/product.enum';
const getAllDailyReport: Router = Router();
getAllDailyReport.post('/', async (req: Request, res: Response) => {
    try {
        const field: search_report = req.body;
        if (
            !field?.date &&
            !field?.department_id &&
            !field?.product &&
            !field?.shift &&
            !field?.user_id
        ) {
            throw new Error('data not empty');
        }
        const isValid = valid_search_daily_report(field);
        if (isValid?.error) {
            return res.status(400).json({
                success: false,
                message: `${isValid?.error?.message}`,
            });
        }
        if (field?.product) {
            if (
                typeof field?.product != 'string' ||
                !Object.values(Products).includes(field?.product)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'product not valid',
                });
            }
        }
        const dailyReports = await find_all_report({
            ...field,
        });
        if (!dailyReports?.success) {
            return res.status(200).json({
                success: false,
                message: dailyReports?.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: dailyReports?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Server Error router: ${error?.message}`,
        });
    }
});

export default getAllDailyReport;
