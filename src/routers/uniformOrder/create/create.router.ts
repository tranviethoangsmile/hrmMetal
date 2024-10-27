import { Request, Response, Router } from 'express';
import { create_uniform_order_controller } from '../../../controllers';
import { boolean } from '@hapi/joi';
import { create_uniform_order } from '../../../interfaces';
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
            return res.status(400).json({
                success: false,
                message: 'Invalid user_id or position or date',
            });
        }

        // Kiểm tra các trường trong items (mảng sản phẩm)
        if (!Array.isArray(field.items) || field.items.length < 1) {
            return res.status(400).json({
                success: false,
                message: 'Items array is required and must not be empty',
            });
        }

        // Kiểm tra từng sản phẩm trong mảng items
        for (const item of field.items) {
            if (
                typeof item.uniform_type !== 'string' ||
                typeof item.uniform_size !== 'string'
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid uniform_type or uniform_size',
                });
            }

            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity must be a positive number and > 0',
                });
            }
        }

        const uniform = await create_uniform_order_controller(field);
        if (!uniform?.success) {
            return res.status(200).json({
                success: false,
                message: uniform.message,
            });
        }
        return res.status(201).json({
            success: true,
            data: uniform?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: boolean,
            message: `server -- ${error.message}`,
        });
    }
});
export default createUniformOrderRouter;
