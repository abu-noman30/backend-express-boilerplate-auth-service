import mongoose from 'mongoose';
import { T_ErrorMessages, T_ErrorResponse } from './error.interface';

export const handleValidationError = (err: mongoose.Error.ValidationError): T_ErrorResponse => {
  const errors: T_ErrorMessages[] = Object.values(err?.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message
      };
    }
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors
  };
};
