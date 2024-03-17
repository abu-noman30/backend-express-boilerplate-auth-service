import { Response } from 'express';
import { T_GenericApiResponse } from './interface';

const sendResponseHandler = <T>(res: Response, data: T_GenericApiResponse<T>): void => {
  const responseData: T_GenericApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponseHandler;
