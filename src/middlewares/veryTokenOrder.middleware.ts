import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const SECRET: string = process.env.SECRET || 'secret';
const very_token_order = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token_req = req.headers.authorization?.split(' ')[1] || '';
    const secret = crypto.createHash('sha256').update(SECRET).digest('hex');
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
