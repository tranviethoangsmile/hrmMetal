"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRateLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.apiRateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after a minute',
    },
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
});
