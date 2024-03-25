import httpStatus from 'http-status';

import { calculatePagination } from '../../../helpers/paginationHelper/calculatePagination';
import { ApiError } from '../../../services/errorHandlers/handleApiError';
import { T_QueryPaginationOptions } from '../../../shared/pagination/pagination';
import { T_GenericServiceResponse } from '../../../shared/types/global';
import { UserConstants } from './user.constant';
import { T_SortByOrderByCondition, T_User, T_UserSearchFilters } from './user.interface';
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
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User not created');
	}

	return newUser;
};

const getAllUserService = async (
	paginationOptions: T_QueryPaginationOptions,
	searchFilterFields: T_UserSearchFilters
): Promise<T_GenericServiceResponse<T_User[]>> => {
	// Pagination calculation
	const { page, limit, skip, sortBy, orderBy } = calculatePagination(paginationOptions);

	// Dynamic  Sort needs  field to do sorting
	const sortByOrderByCondition: T_SortByOrderByCondition = {};
	if (sortBy && orderBy) sortByOrderByCondition[sortBy] = orderBy;

	// Extract searchTerm to implement search query
	const { searchTerm, ...restSearchFields } = searchFilterFields;

	// Search query conditions
	const andConditions = [];

	if (searchTerm) {
		andConditions.push({
			$or: UserConstants.SEARCHING_FIELDS_FOR_SEARCH_TERM.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i'
				}
			}))
		});
	}

	if (Object.keys(restSearchFields).length > 0) {
		andConditions.push({
			$and: Object.entries(restSearchFields).map(([field, value]) => ({ [field]: value }))
		});
	}

	// If there is no condition , put {} to give all data
	const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};

	const result = await User.find(whereCondition).sort(sortByOrderByCondition).skip(skip).limit(limit);
	const total = await User.countDocuments();

	return {
		meta: {
			page,
			limit,
			total
		},
		data: result
	};
};

const getSingleUserService = async (userId: string): Promise<T_User> => {
	const user = await User.findById(userId);

	if (!user) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found');
	}

	return user;
};

const updateUserService = async (userId: string, payload: Partial<T_User>): Promise<T_User> => {
	const result = await User.findOneAndUpdate({ _id: userId }, payload, { new: true, upsert: true });

	if (!result) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'User not updated');
	}

	return result;
};

const deleteUserService = async (userId: string): Promise<T_User | null | unknown> => {
	const result = await User.findByIdAndDelete(userId);
	return result;
};

export const UserServices = {
	createUserService,
	getAllUserService,
	getSingleUserService,
	updateUserService,
	deleteUserService
};
