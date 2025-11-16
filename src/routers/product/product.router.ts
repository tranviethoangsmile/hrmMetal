import { Router, Request, Response } from 'express';
import { create_product } from '../../controllers/product/product.controller';
import productModuleRouter from './moduleProductRouter/product.router';
import { errorResponse, successResponse } from '../../helpers';

const productRouter: Router = Router();

productRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != undefined) {
            const product = await create_product(data);
            if (product?.success) {
                return successResponse(res, 201, product?.data);
            } else {
                return errorResponse(res, 400, product?.message || 'Failed to create product');
            }
        } else {
            return errorResponse(res, 400, 'Data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

productRouter.use('/search', productModuleRouter);

export default productRouter;
