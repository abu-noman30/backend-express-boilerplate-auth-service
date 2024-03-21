import mongoose from 'mongoose';
import { T_ErrorMessages } from './error.interface';

export const handleCastError = (error: mongoose.Error.CastError) => {
	const errors: T_ErrorMessages[] = [
		{
			path: error.path,
			message: 'Invalid Id'
		}
	];

	const statusCode = 400;
	return {
		statusCode,
		message: 'Cast Error',
		errorMessages: errors
	};
};
