import { Router, Request, Response } from 'express';
import { findByName } from '../../../controllers';
import { IFindByName } from '../../../interfaces/user/user.interface';
const userFindByNameRouter: Router = Router();

userFindByNameRouter.post('', async (req: Request, res: Response) => {
    try {
        const name: IFindByName | undefined = req.body.name;
        if (!name) {
            return res
                .status(400)
                .json({ success: false, message: 'Name is required' });
        }
        const users = await findByName(name);
        if (!users?.success) {
            return res
                .status(200)
                .json({ success: false, message: users?.message });
        }
        return res.status(202).json({ success: true, data: users?.data });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
});

export default userFindByNameRouter;
