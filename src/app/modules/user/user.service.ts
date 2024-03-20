import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper/calculatePagination';
import { ApiError } from '../../../services/errorHandlers/handleApiError';
import { T_QueryPaginationOptions } from '../../../shared/pagination/pagination';
import { T_GenericServiceResponse } from '../../../shared/types/global';
import { T_User, T_UserSearchFilters } from './user.interface';
import { User } from './user.model';
import { generateIncrementedUserId } from './user.utils';

const createUserService = async (user: T_User): Promise<T_User> => {
	const findLastUser = await User.findOne().sort({ createdAt: -1 }).limit(1);

	const userObj = {
		...user,
		user_id: '000001',
		user_password: '000001'
	};

	if (findLastUser) {
		const generatedUserId = generateIncrementedUserId(findLastUser?.user_id);
		(userObj.user_id = generatedUserId), (userObj.user_password = generatedUserId);
	}

	const newUser = await User.create(userObj);

	if (!newUser) {
		throw new ApiError(500, 'User not created');
	}

	return newUser;
};

const getAllUserService = async (
	paginationOptions: T_QueryPaginationOptions,
	filterOptions: T_UserSearchFilters
): Promise<T_GenericServiceResponse<T_User[]>> => {
	// Pagination calculation
	const { page, limit, skip, sortBy, orderBy } = calculatePagination(paginationOptions);
	// Extract searchTerm to implement search query
	const { searchTerm, ...filtersQueryParams } = filterOptions;

	// Dynamic  Sort needs  field to do sorting
	const sortByOrderByCondition: { [key: string]: SortOrder } = {};
	if (sortBy && orderBy) sortByOrderByCondition[sortBy] = orderBy;

	const result = await User.find().sort(sortByOrderByCondition).skip(skip).limit(limit);
	const total = await User.countDocuments();

	return {
		meta: {
			page: page,
			limit: limit,
			total: total
		},
		data: result
	};
};

export const UserServices = {
	createUserService,
	getAllUserService
};
