import { Request, Response, Router } from 'express';
import { getUserForLeaveFeatureControll } from '../../../controllers/user/user.controller';
const getUserWithDepartmentId: Router = Router();

getUserWithDepartmentId.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.body.department_id;
        if (id != null) {
            const listUser = await getUserForLeaveFeatureControll(id);
            if (listUser?.success) {
                res.status(202).json({
                    success: true,
                    data: listUser?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: listUser?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
});

export default getUserWithDepartmentId;
