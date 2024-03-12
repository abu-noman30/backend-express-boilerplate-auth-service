import { ApiError } from '../../../services/errorHandlers/handleApiError';
import { T_User } from './users.interface';
import { User } from './users.model';
import { generateIncrementedUserId } from './users.utils';

const createUserService = async (user: T_User): Promise<T_User> => {
  try {
    const findLastUser = await User.findOne().sort({ createdAt: -1 }).limit(1);

    user.id = generateIncrementedUserId(findLastUser?.id || '000000');

    const newUser = await User.create(user);

    if (!newUser) {
      throw new ApiError(400, 'Failed to create User');
    }
    return newUser;
  } catch (err: unknown) {
    console.log((err as Error).message);
    throw new Error((err as Error).message);
  }
};

export default {
  createUserService
};
