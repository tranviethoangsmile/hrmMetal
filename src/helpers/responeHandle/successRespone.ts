import { Response } from 'express';

/**
 * Helper function để trả về success response
 * @param res - Express Response object
 * @param statusCode - HTTP status code (default: 200)
 * @param data - Data to return (optional)
 * @param message - Success message (optional)
 */
const successResponse = (
    res: Response,
    statusCode: number = 200,
    data?: any,
    message?: string
) => {
    const response: any = {
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

export default successResponse;