import { Request } from 'express';
import { rateLimit } from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message:
            'Too many requests from this IP, please try again after a minute',
    },
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
});
