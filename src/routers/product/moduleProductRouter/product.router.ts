import { Router, Request, Response } from 'express';
import { search_product } from '../../../controllers/product/product.controller';
import moment from 'moment-timezone';
import { errorResponse, successResponse } from '../../../helpers';

const productModuleRouter = Router();

productModuleRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field = req.body;
        if (field?.date != null) {
            const date = moment(field.date, 'YYYY/MM/DD');
            field.date = date.toISOString();
        }
        const products = await search_product(field);
        if (products?.success) {
            return successResponse(res, 200, products?.data);
        } else {
            return errorResponse(res, 400, products?.message || 'Failed to search products');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default productModuleRouter;
