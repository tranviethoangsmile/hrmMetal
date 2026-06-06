"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper function để trả về error response
 * @param res - Express Response object
 * @param statusCode - HTTP status code (default: 500)
 * @param message - Error message
 */
const errorResponse = (res, statusCode = 500, message) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};
exports.default = errorResponse;
