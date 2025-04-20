import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../useCases/user/user.useCase';

const addPosition = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body;

    if (typeof user_id !== 'string' || !user_id.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Invalid User ID',
        });
    }

    try {
        const user = await findUserById(user_id);

        if (user?.success) {
            req.body.position = user.data?.position;
            return next();
        }

        return res.status(200).json({
            success: false,
            message: user?.message || 'Failed to retrieve user data',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`,
        });
    }
};

export default addPosition;
