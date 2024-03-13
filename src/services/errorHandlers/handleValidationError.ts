import mongoose from 'mongoose';
import { T_GenericErrorMessage, T_GenericErrorResponse } from './interfaces/error.interface';

export const handleValidationError = (err: mongoose.Error.ValidationError): T_GenericErrorResponse => {
	const errors: T_GenericErrorMessage[] = Object.values(err?.errors).map(
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
