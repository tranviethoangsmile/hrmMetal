import { Router, Request, Response } from 'express';
import { create, find, find_all } from '../../controllers/food/food.controller';
import { errorResponse, successResponse } from '../../helpers';

const foodRouter: Router = Router();

foodRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: object | null = req.body;
        if (data != null) {
            const food = await create(data);
            if (food?.success) {
                return successResponse(res, 201, food?.data);
            } else {
                return errorResponse(res, 400, food?.message || 'Failed to create food');
            }
        } else {
            return errorResponse(res, 400, 'Data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

foodRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        if (id != null) {
            const food = await find(id);
            if (food?.success) {
                return successResponse(res, 200, food?.data);
            } else {
                return errorResponse(res, 404, food?.message || 'Food not found');
            }
        } else {
            return errorResponse(res, 400, 'ID is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

foodRouter.get('/', async (req: Request, res: Response) => {
    try {
        const foods = await find_all();

        if (foods?.success) {
            return successResponse(res, 200, foods?.data);
        } else {
            return errorResponse(res, 400, foods?.message || 'Failed to get foods');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default foodRouter;
