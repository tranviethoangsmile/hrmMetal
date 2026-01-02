import { Router, Request, Response } from 'express';
import { search_all_trainning } from '../../../controllers/trainning/trainning.controller';
import { errorResponse, successResponse } from '../../../helpers';

const TrainningRouter = Router();

TrainningRouter.get('/:product_name', async (req: Request, res: Response) => {
    try {
        const data = req.params.product_name;
        if (!data) {
            return errorResponse(res, 400, 'product_name is required');
        } else {
            const trainnings = await search_all_trainning(data);
            if (trainnings?.success) {
                if (trainnings?.data?.length === 0) {
                    return errorResponse(res, 404, 'Product not exist');
                } else {
                    return successResponse(res, 200, trainnings?.data);
                }
            } else {
                return errorResponse(res, 400, trainnings?.message || 'Failed to search trainings');
            }
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default TrainningRouter;
