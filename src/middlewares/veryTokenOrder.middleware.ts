import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getJwtSecret } from '../securitys/auth/jwtSecret';
const very_token_order = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token_req = req.headers.authorization?.split(' ')[1] || '';
    const secret = getJwtSecret();
    let active: any;
    jwt.verify(token_req, secret, (err, decoded) => {
        if (err) {
            res.status(200).json({
                success: false,
                message: 'authentication failed',
            });
        } else {
            active = decoded;
            if (active.position != '') {
                next();
            } else {
                res.status(200).send({
                    success: false,
                    message: 'you are not authorized',
                });
            }
        }
    });
};

export { very_token_order };
