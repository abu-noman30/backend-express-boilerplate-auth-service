import { SortOrder } from 'mongoose';

export type T_User = {
	user_id: string;
	user_role: string;
	user_password: string;
};

export type T_UserSearchFilters = {
	searchTerm?: string;
};

export type T_SortByOrderByCondition = {
	[key: string]: SortOrder;
};
