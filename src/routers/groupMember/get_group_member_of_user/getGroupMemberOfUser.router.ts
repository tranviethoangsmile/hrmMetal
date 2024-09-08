import { Request, Response, Router } from 'express';
import { find_group_member_of_user_controller } from '../../../controllers';
import { validation_id } from '../../../validates';
const getGroupMemberRouter: Router = Router();

getGroupMemberRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user_id: string | undefined = req.body.user_id;

        if (typeof user_id !== 'string') {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid user_id' });
        }
        const isValid = validation_id(user_id);
        if (isValid?.error) {
            return res
                .status(400)
                .json({ success: false, message: isValid?.error.message });
        }
        const group_members = await find_group_member_of_user_controller(
            user_id,
        );
        if (!group_members?.success) {
            return res
                .status(200)
                .json({ success: false, message: group_members?.message });
        }
        return res
            .status(202)
            .json({ success: true, data: group_members?.data });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});

export default getGroupMemberRouter;
