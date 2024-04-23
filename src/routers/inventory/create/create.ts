import { Router, Request, Response } from 'express';
import { create } from '../../../controllers/inventory/inventory.controller';
import { create_inventory } from '../../../interfaces/inventory/inventory.interface';
const createRouter: Router = Router();
createRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_inventory = req.body;
        if (
            !field ||
            !field.product ||
            !field.quantity ||
            !field.department_id
        ) {
            res.status(400).json({
                success: false,
                message: 'Bad request',
            });
        } else {
            const inventory = await create(field);
            if (inventory?.success) {
                res.status(201).json({
                    success: true,
                    data: inventory?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: inventory?.message,
                });
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `${error?.message} server error`,
        });
    }
});

export default createRouter;
