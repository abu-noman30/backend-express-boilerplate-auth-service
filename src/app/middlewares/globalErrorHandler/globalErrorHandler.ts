import chalk from 'chalk';
import config from '../../../config';

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { loggerError } from '../../../services/Logger/logger';
import { T_ErrorMessages } from '../../../services/errorHandlers/error.interface';
import { ApiError } from '../../../services/errorHandlers/handleApiError';
import { handleCastError } from '../../../services/errorHandlers/handleCastError';
import { handleValidationError } from '../../../services/errorHandlers/handleValidationError';
import { handleZodError } from '../../../services/errorHandlers/handleZodError';

export const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
	let statusCode = 500;
	let message = 'Something went wrong';
	let errorMessages: T_ErrorMessages[] = [];

	switch (true) {
		// mongoose.Error.ValidationError
		case error?.name === ErrorType.VALIDATION_ERROR:
			const simplifiedError = handleValidationError(error);
			statusCode = simplifiedError.statusCode;
			message = simplifiedError.message;
			errorMessages = simplifiedError.errorMessages;
			break;

		// mongoose.Error.CastError
		case error?.name === 'CastError':
			const simplifiedErrorCast = handleCastError(error);
			statusCode = simplifiedErrorCast.statusCode;
			message = simplifiedErrorCast.message;
			errorMessages = simplifiedErrorCast.errorMessages;
			break;

		// zod error
		case error instanceof ZodError:
			const simplifiedErrorZod = handleZodError(error);
			statusCode = simplifiedErrorZod.statusCode;
			message = simplifiedErrorZod.message;
			errorMessages = simplifiedErrorZod.errorMessages;
			break;

		// error instanceof ApiError
		case error instanceof ApiError:
			statusCode = error?.statusCode;
			message = error.message;
			errorMessages = error?.message ? [{ path: '', message: error?.message }] : [];
			break;

		// error instanceof Error
		case error instanceof Error:
			message = error?.message;
			errorMessages = error?.message ? [{ path: '', message: error?.message }] : [];
			break;
	}

	// logger service
	if (config.env === 'production') {
		loggerError.error(error);
	} else {
		console.log(chalk.red('[GLOBAL-ERROR]: '), error);
	}

	res.status(statusCode).json({
		success: false,
		message,
		errorMessages,
		stack: config.env === 'production' ? undefined : error?.stack
	});
};

enum ErrorType {
	VALIDATION_ERROR = 'ValidationError'
}
