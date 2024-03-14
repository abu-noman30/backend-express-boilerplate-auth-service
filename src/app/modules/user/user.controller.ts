import { RequestHandler } from 'express';
import catchAsync from '../../../services/catchAsync/catchAsync';
import { UserServices } from './user.service';

const createUserController: RequestHandler = catchAsync(async (req, res, next) => {
	const userData = req.body;
	const result = await UserServices.createUserService(userData);

	next();

	res.status(200).json({
		success: true,
		message: 'User created successfully',
		data: result
	});
});

export const UserControllers = {
	createUserController
};
