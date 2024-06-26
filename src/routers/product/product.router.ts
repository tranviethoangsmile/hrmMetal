import { Router, Request, Response } from 'express';
import { create_product } from '../../controllers/product/product.controller';
import productModuleRouter from './moduleProductRouter/product.router';
const productRouter: Router = Router();

productRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != undefined) {
            const product = await create_product(data);
            if (product?.success) {
                res.status(201).send({
                    success: true,
                    data: product?.data,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: product?.message,
                });
            }
        } else {
            res.status(200).send({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

productRouter.use('/search', productModuleRouter);

export default productRouter;
