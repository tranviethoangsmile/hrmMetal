import { Router, Request, Response } from 'express';
import { search_all_trainning } from '../../../controllers/trainning/trainning.controller';

const TrainningRouter = Router();

TrainningRouter.get('/:product_name', async (req: Request, res: Response) => {
    try {
        const data = req.params.product_name;
        console.log(data);
        if (!data) {
            res.status(400).send({
                success: false,
                message: 'values not empty',
            });
        } else {
            const trainnings = await search_all_trainning(data);
            if (trainnings?.success) {
                if (trainnings?.data?.length === 0) {
                    res.status(201).send({
                        success: false,
                        message: 'Product not exist',
                    });
                } else {
                    res.status(201).send({
                        success: true,
                        data: trainnings?.data,
                    });
                }
            } else {
                res.status(200).send({
                    success: false,
                    message: trainnings?.message,
                });
            }
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error:' + error?.message,
        });
    }
});

export default TrainningRouter;
