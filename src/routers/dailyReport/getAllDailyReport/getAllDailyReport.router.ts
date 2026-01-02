import { Router, Request, Response } from 'express';
import { find_all_report } from '../../../controllers/dailyReport/dailyReport.controler';
import { search_report } from '../../../interfaces/dailyReport/dailyReport.interface';
import { valid_search_daily_report } from '../../../validates/dailyReport/dailyReport.validate';
import { Products } from '../../../enum/product.enum';
import { errorResponse, successResponse } from '../../../helpers';

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
            return errorResponse(res, 400, 'At least one search field is required');
        }
        const isValid = valid_search_daily_report(field);
        if (isValid?.error) {
            return errorResponse(res, 400, isValid?.error?.message || 'Validation failed');
        }
        if (field?.product) {
            if (
                typeof field?.product != 'string' ||
                !Object.values(Products).includes(field?.product)
            ) {
                return errorResponse(res, 400, 'product not valid');
            }
        }
        const dailyReports = await find_all_report({
            ...field,
        });
        if (!dailyReports?.success) {
            return errorResponse(res, 400, dailyReports?.message || 'Failed to get daily reports');
        }
        return successResponse(res, 200, dailyReports?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default getAllDailyReport;
