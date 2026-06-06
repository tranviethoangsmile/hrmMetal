"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper function để trả về success response
 * @param res - Express Response object
 * @param statusCode - HTTP status code (default: 200)
 * @param data - Data to return (optional)
 * @param message - Success message (optional)
 */
const successResponse = (res, statusCode = 200, data, message) => {
    const response = {
        success: true,
    };
    if (data !== undefined) {
        response.data = data;
    }
    if (message !== undefined) {
        response.message = message;
    }
    return res.status(statusCode).json(response);
};
exports.default = successResponse;
