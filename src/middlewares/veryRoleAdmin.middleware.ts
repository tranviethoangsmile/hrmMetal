import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../useCases';
import { Role } from '../enum';
const authAdminRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { user_id } = req.body;
        if (!user_id || typeof user_id !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'User ID is required and must be a string',
            });
        }
        const user = await findUserById(user_id);
        if (!user?.success || user?.data?.role.toString() !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Admin role is required',
            });
        }
        next();
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`,
        });
    }
};

export default authAdminRole;
