import { Request, Response, Router } from 'express';
import { create_uniform_order_controller } from '../../../controllers';
import { boolean } from '@hapi/joi';
import { create_uniform_order } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';
const createUniformOrderRouter: Router = Router();
createUniformOrderRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_uniform_order = req.body;
        // Kiểm tra user_id và position
        if (
            typeof field.user_id !== 'string' ||
            typeof field.position !== 'string' ||
            typeof field.date !== 'string'
        ) {
            const missingFields = [
                !field.user_id && 'user_id',
                !field.position && 'position',
                !field.date && 'date',
            ]
                .filter(Boolean)
                .join(', ');

            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }

        // Kiểm tra các trường trong items (mảng sản phẩm)
        if (!Array.isArray(field.items) || field.items.length < 1) {
            return errorResponse(res, 400, 'Items array is required and must not be empty');
        }

        // Kiểm tra từng sản phẩm trong mảng items
        for (const item of field.items) {
            if (
                typeof item.uniform_type !== 'string' ||
                typeof item.uniform_size !== 'string'
            ) {
                return errorResponse(res, 400, 'Invalid uniform_type or uniform_size');
            }

            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                return errorResponse(res, 400, 'Quantity must be a positive number and > 0');
            }
        }

        const uniform = await create_uniform_order_controller(field);
        if (!uniform?.success) {
            return errorResponse(res, 400, uniform.message || 'Failed to create uniform order');
        }
        return successResponse(res, 201, uniform?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default createUniformOrderRouter;
