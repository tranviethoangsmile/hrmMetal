import { Request, Response, NextFunction } from 'express';
import { findById } from '../controllers/user.controller';
const very_role = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: string = req.body.user_id;
        const user = await findById(user_id);
        console.log(user);
        if (user?.data?.role.toString() !== 'STAFF') {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: 'you not Unauthorized',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
};

export default very_role;
