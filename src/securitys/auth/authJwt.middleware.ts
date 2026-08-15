import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { errorResponse } from '../../helpers';
import { token_payload } from '../../interfaces/login/login.interface';
import { getJwtSecret } from './jwtSecret';

declare global {
    namespace Express {
        interface Request {
            user?: token_payload & JwtPayload;
        }
    }
}

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
        const decoded = jwt.verify(token, getJwtSecret());
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
