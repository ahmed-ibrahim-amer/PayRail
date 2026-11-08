export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code: string = 'INTERNAL_ERROR',
    ){
        super(message);
        this.name = 'AppError';
    }
}
export class NotFoundError extends AppError {
    constructor (message = 'Resource not found'){
        super(404 , message,'NOT_FOUND');
    }
}

export class BadRequestError extends AppError {
    constructor(message = 'Bad request'){
        super(400 , message , 'BAD_REQUEST')
    }
}