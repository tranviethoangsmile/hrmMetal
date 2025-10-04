import { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: (req: Request, res: Response) => {
        return res.status(429).json({
            success: false,
            message:
                'Too many requests from this IP, please try again after a minute',
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request, res: Response) => {
        console.log('req.ip', req.ip);
        return req.ip || '';
    },
});
