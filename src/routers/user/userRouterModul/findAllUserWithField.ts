import { Request, Response, Router } from 'express';
import { findAllUserWithFieldControll } from '../../../controllers/user/user.controller';
const findUser: Router = Router();

findUser.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const users = await findAllUserWithFieldControll(field);
            if (users?.success) {
                res.status(202).json({
                    success: users?.success,
                    data: users?.data,
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

export default findUser;
