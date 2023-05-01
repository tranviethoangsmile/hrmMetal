import { Router, Request, Response } from 'express';
import {
    create_canteen,
    find_canteen_by_id,
    get_all_canteen,
} from '../controllers/canteen.controller';
const canteenRouter = Router();

canteenRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (data != undefined) {
            const canteen = await create_canteen(data);
            if (canteen?.success) {
                res.status(201).json({
                    success: true,
                    data: canteen?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: canteen?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

canteenRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.params.id;
        if (id != null) {
            const canteen = await find_canteen_by_id(id);
            if (canteen?.success) {
                res.status(201).json({
                    success: true,
                    data: canteen?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: canteen?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

canteenRouter.get('/', async (req: Request, res: Response) => {
    try {
        const canteens = await get_all_canteen();
        if (canteens?.success) {
            res.status(201).json({
                success: true,
                data: canteens?.data,
            });
        } else {
            res.status(200).json({
                success: false,
                message: canteens?.message,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});
export default canteenRouter;
