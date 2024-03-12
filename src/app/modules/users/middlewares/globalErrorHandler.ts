import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const globalErrorHandler: ErrorRequestHandler (error , req: Request, res: Response, next: NextFunction) => {
  
}