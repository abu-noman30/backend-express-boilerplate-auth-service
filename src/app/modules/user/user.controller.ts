import httpStatus from 'http-status';
import catchAsync from '../../../services/catchAsync/catchAsync';
import sendResponseHandler from '../../../services/sendResponseHandler/sendResponseHandler';

import { RequestHandler } from 'express';
import { queryParamsPicker } from '../../../services/queryParamsPicker/queryParamsPicker';
import { PAGINATION_FIELDS } from '../../../shared/pagination/pagination.constant';
import { UserConstants } from './user.constant';
import { T_User } from './user.interface';
import { UserServices } from './user.service';

const createUserController: RequestHandler = catchAsync(async (req, res) => {
	const userData = req.body;
	const result = await UserServices.createUserService(userData);

	sendResponseHandler<T_User>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User created successfully',
		data: result
	});
});

const getAllUserController: RequestHandler = catchAsync(async (req, res) => {
	const paginationOptions = queryParamsPicker(req.query, PAGINATION_FIELDS);
	const searchFilterFields = queryParamsPicker(req.query, UserConstants.SEARCH_FIELDS);

	const result = await UserServices.getAllUserService(paginationOptions, searchFilterFields);

	sendResponseHandler<T_User[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users fetched successfully',
		meta: result.meta,
		data: result.data
	});
});

const getSingleUserController: RequestHandler = catchAsync(async (req, res) => {
	const userId = req.params.id;
	const result = await UserServices.getSingleUserService(userId);

	sendResponseHandler<T_User>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User fetched successfully',
		data: result
	});
});

const updateUserController: RequestHandler = catchAsync(async (req, res) => { 
	const userId = req.params.id;
	const updatedData = req.body;

	const result = await UserServices.updateUserService(userId, updatedData);

	sendResponseHandler<T_User>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User updated successfully',
		data: result
	});
});

export const UserControllers = {
	createUserController,
	getAllUserController,
	getSingleUserController,
	updateUserController
};
