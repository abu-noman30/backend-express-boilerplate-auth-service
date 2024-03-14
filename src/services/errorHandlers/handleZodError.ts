import { ZodError, ZodIssue } from 'zod';
import { T_GenericErrorMessage, T_GenericErrorResponse } from './interfaces/error.interface';

export const handleZodError = (err: ZodError): T_GenericErrorResponse => {
	const errors: T_GenericErrorMessage[] = err?.issues?.map((issue: ZodIssue) => {
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
