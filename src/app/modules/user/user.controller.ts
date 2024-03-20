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
	const filterOptions = queryParamsPicker(req.query, UserConstants.SEARCH_FIELDS);

	const result = await UserServices.getAllUserService(paginationOptions, filterOptions);

	sendResponseHandler<T_User[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users fetched successfully',
		meta: result.meta,
		data: result.data
	});
});

export const UserControllers = {
	createUserController,
	getAllUserController
};
