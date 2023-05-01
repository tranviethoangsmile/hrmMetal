import { Router, Request, Response } from 'express';
import { search_product } from '../../controllers/product.controller';
import moment from 'moment-timezone';

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
            res.status(201).send({
                success: true,
                data: products?.data,
            });
        } else {
            res.status(201).send({
                success: false,
                message: products?.message,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default productModuleRouter;
