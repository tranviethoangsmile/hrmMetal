import { Request, Response, Router } from 'express';
import { get_day_off_by_id_controller } from '../../../controllers/dayOff/dayOff.controller';

const getByIdRouter: Router = Router();

getByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id || id === '' || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'ID is required',
            });
        }
        const dayOff = await get_day_off_by_id_controller(id);
        if (!dayOff?.success) {
            return res.status(200).json({
                success: false,
                message: dayOff.message,
            });
        }
        return res.status(202).json(dayOff);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `server error::  ${error.message}`,
        });
    }
});

export default getByIdRouter;
