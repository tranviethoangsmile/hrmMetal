import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const SECRET: string = process.env.SECRET || 'secret';
const very_token_order = async (req: Request, res: Response, next: NextFunction) => {
    const token_req = req.get('token') || '';
    const secret = crypto.createHash('sha256').update(SECRET).digest('hex');
    let acctive: any ;
    jwt.verify(token_req, secret, (err, decoded) => {
        if (err){
            res.status(403).json({
                message: 'authentication failed',
            })
        }else {
            acctive = decoded
            if(acctive.position != '') {
                next();
            }else {
                res.status(403).send({
                    message: 'you are not authorized'
                })
            }
        }
    });
};

export { very_token_order };
