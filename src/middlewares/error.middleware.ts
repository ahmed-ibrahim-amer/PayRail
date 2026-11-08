import type { NextFunction, Request, Response } from 'express';
import { AppError, NotFoundError } from '../common/error.js';
import { logger } from '../common/logger.js';


// Not found handler function
export const NotFoundHandler = (err: Error , req:Request , res:Response , next: NextFunction)=>{
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}

export const errorHandler = (err: Error , req:Request , res:Response , next: NextFunction) =>{
    if (err instanceof AppError){
        return res.status(err.statusCode).json({
            error:{code:err.code , message: err.message}
        });
    }
    logger.error({err}, 'Unhandeld error');
        return res.status(500).json({
        error:{code:"Internal_Error" , message:'Something went error'}
})
}




