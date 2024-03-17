import { calculatePagination } from '../../../helpers/paginationHelper/calculatePagination';
import { ApiError } from '../../../services/errorHandlers/handleApiError';
import { T_QueryPaginationOptions } from '../../../shared/pagination/pagination';
import { T_GenericServiceResponse } from '../../../shared/types/global';
import { T_User } from './user.interface';
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
  paginationOptions: T_QueryPaginationOptions
): Promise<T_GenericServiceResponse<T_User[]>> => {
  const queryPagination = calculatePagination(paginationOptions);

  const result = await User.find().skip(queryPagination?.skip).limit(queryPagination?.limit);
  const total = await User.countDocuments();

  return {
    meta: {
      page: queryPagination?.page,
      limit: queryPagination?.limit,
      total
    },
    data: result
  };
};

export const UserServices = {
  createUserService,
  getAllUserService
};
