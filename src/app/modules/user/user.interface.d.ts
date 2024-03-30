import { Model, SortOrder } from 'mongoose';

export type T_User = {
  user_id: string;
  user_role: string;
  user_password: string;
};
export type T_UserMethods = {};
export type UserModel = Model<T_User, Record<string | unknown>, T_UserMethods>;


// Query Types
export type T_UserQuerySearchOptions = {
  searchTerm?: string;
};

export type T_UserSortByOrderByCondition = {
  [key: string]: SortOrder;
};
