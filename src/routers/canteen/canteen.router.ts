import { Router, Request, Response } from 'express';
import {
    create_canteen,
    find_canteen_by_id,
    get_all_canteen,
} from '../../controllers/canteen/canteen.controller';
import { errorResponse, successResponse } from '../../helpers';

const canteenRouter: Router = Router();

canteenRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != undefined) {
            const canteen = await create_canteen(data);
            if (canteen?.success) {
                return successResponse(res, 201, canteen?.data);
            } else {
                return errorResponse(res, 400, canteen?.message || 'Failed to create canteen');
            }
        } else {
            return errorResponse(res, 400, 'data is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

canteenRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.params.id;
        if (id != null) {
            const canteen = await find_canteen_by_id(id);
            if (canteen?.success) {
                return successResponse(res, 200, canteen?.data);
            } else {
                return errorResponse(res, 404, canteen?.message || 'Canteen not found');
            }
        } else {
            return errorResponse(res, 400, 'id is required');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

canteenRouter.get('/', async (req: Request, res: Response) => {
    try {
        const canteens = await get_all_canteen();
        if (canteens?.success) {
            return successResponse(res, 200, canteens?.data);
        } else {
            return errorResponse(res, 400, canteens?.message || 'Failed to get canteens');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default canteenRouter;
