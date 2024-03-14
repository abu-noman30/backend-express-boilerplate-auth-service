import chalk from 'chalk';
import config from '../../../config';

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { loggerError } from '../../../services/Logger/logger';
import { ApiError } from '../../../services/errorHandlers/handleApiError';
import { handleValidationError } from '../../../services/errorHandlers/handleValidationError';
import { handleZodError } from '../../../services/errorHandlers/handleZodError';
import { T_GenericErrorMessage } from '../../../services/errorHandlers/interfaces/error.interface';
import { ErrorType } from './errorType.enum';

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
	let statusCode = 500;
	let message = 'Something went wrong';
	let errorMessages: T_GenericErrorMessage[] = [];

	switch (true) {
		// mongoose.Error.ValidationError
		case error?.name === ErrorType.VALIDATION_ERROR:
			const simplifiedError = handleValidationError(error);
			statusCode = simplifiedError.statusCode;
			message = simplifiedError.message;
			errorMessages = simplifiedError.errorMessages;
			break;

		/* case (error?.name === 'CastError'):
        const simplifiedErrorCast = handleCastError(error);
        statusCode = simplifiedErrorCast.statusCode;
        message = simplifiedErrorCast.message;
        errorMessages = simplifiedErrorCast.errorMessages;
        break; */

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

	next();
};
