import { ZodError, ZodIssue } from 'zod';
import { T_ErrorMessages, T_ErrorResponse } from './error.interface';

export const handleZodError = (err: ZodError): T_ErrorResponse => {
  const errors: T_ErrorMessages[] = err?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message
    };
  });

  return {
    statusCode: 400,
    message: 'Zod Validation Error',
    errorMessages: errors
  };
};
