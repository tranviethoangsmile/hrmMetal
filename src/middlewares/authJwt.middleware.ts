import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { errorResponse } from '../helpers';
import { token_payload } from '../interfaces/login/login.interface';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: token_payload & JwtPayload;
        }
    }
}

const SECRET: string = process.env.SECRET || '';

const getBearerToken = (authorization?: string): string => {
    if (!authorization) {
        return '';
    }

    const [scheme, token] = authorization.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return '';
    }

    return token;
};

const authJwt = (req: Request, res: Response, next: NextFunction) => {
    const token: string = getBearerToken(req.headers.authorization);
    if (!token) {
        return errorResponse(res, 401, 'Authentication token is required');
    }

    try {
        const secret = crypto.createHash('sha256').update(SECRET).digest('hex');
        const decoded = jwt.verify(token, secret);
        if (!decoded || typeof decoded === 'string') {
            return errorResponse(res, 401, 'Invalid authentication token');
        }

        req.user = decoded as token_payload & JwtPayload;
        return next();
    } catch (error: any) {
        return errorResponse(
            res,
            401,
            error?.message || 'Invalid authentication token'
        );
    }
};

export default authJwt;
