import { Response } from 'express';

interface ErrorResponseParams {
    res: Response;
    statusCode: number;
    message: string;
}

/**
 * Helper function để trả về error response
 * @param res - Express Response object
 * @param statusCode - HTTP status code (default: 500)
 * @param message - Error message
 */
const errorResponse = (
    res: Response,
    statusCode: number = 500,
    message: string
) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};

export default errorResponse;