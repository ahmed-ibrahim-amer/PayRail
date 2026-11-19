
import type { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError } from '../common/error.js';
import { logger } from '../common/logger.js';

// Handle unknown routes
export const NotFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(new NotFoundError(
        `Route ${req.method} ${req.originalUrl} not found`
    ));
};

// Global error handler
export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
    }

    logger.error({ err }, 'Unhandled error');

    return res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Something went wrong',
        },
    });
};
