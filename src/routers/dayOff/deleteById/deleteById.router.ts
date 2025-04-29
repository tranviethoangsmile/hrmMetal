import { Request, Response, Router } from 'express';
import { delete_day_off_by_id_controller } from '../../../controllers/dayOff/dayOff.controller';
const deleteByIdRouter: Router = Router();

deleteByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id || typeof id !== 'string' || id.trim() === '') {
            return res.status(400).json({
                success: false,
                message: `Invalid input: ID is required and must be a non-empty string`,
            });
        }
        const isDeleted = await delete_day_off_by_id_controller(id);
        if (!isDeleted?.success) {
            return res.status(404).json({
                success: false,
                message: `Day off with ID ${id} not found`,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error :: ${error?.message}`,
        });
    }
});
export default deleteByIdRouter;
