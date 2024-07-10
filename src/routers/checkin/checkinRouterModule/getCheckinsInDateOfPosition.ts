import { Request, Response, Router } from 'express';
import { get_checkin_in_date_of_position_controller } from '../../../controllers/checkin/checkin.controller';

const getCheckinIndateOfPosition: Router = Router();

getCheckinIndateOfPosition.post('/', async (req: Request, res: Response) => {
    try {
        let field: object | null = req.body;
        if (field != null) {
            const result = await get_checkin_in_date_of_position_controller(
                field,
            );
            if (result?.success) {
                return res.status(202).json({
                    success: true,
                    data: result?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: result?.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

export default getCheckinIndateOfPosition;
