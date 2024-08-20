//message, status code, error codes, error

export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: any;

    constructor(message:string, errorCode:ErrorCode, statusCode:number, error:any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 101,
    USER_ALREADY_EXISTS = 102,
    INCORRECT_PASSWORD = 103,
    UNPROCESSABLE_ENTITY = 104,
    INTERNAL_EXCEPTION = 105,
    UNAUTHORIZED = 106
}