import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../useCases/user/user.useCase';
const addPosition = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.body.user_id;
    if (user_id || typeof user_id == 'string') {
        const user = await findUserById(user_id);
        if (user?.success) {
            req.body.position = user?.data?.position;
            next();
        } else {
            res.status(200).json({
                success: false,
                message: user?.message,
            });
        }
    } else {
        return res.status(400).send('Invalid User ID');
    }
};

export default addPosition;
